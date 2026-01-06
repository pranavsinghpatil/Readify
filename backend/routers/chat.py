from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.llm_provider import LLMProvider
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from backend.database import get_collection
from langchain_core.prompts import PromptTemplate

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/query")
async def chat(request: ChatRequest):
    collection = get_collection()
    if collection is None:
        raise HTTPException(status_code=500, detail="Database not configured.")

    provider = LLMProvider()
    embeddings = provider.get_embeddings()
    
    vector_store = MongoDBAtlasVectorSearch(
        collection=collection, 
        embedding=embeddings, 
        index_name="vector_index", 
        text_key="text", 
        embedding_key="embedding"
    )
    
    # Retrieve
    docs = vector_store.similarity_search(request.question, k=5)
    
    if not docs:
        return {
            "answer": "I couldn't find this information in the uploaded document.",
            "citations": []
        }

    context = "\n\n".join([doc.page_content for doc in docs])
    
    # Generate
    llm = provider.get_chat_model()
    
    prompt_template = """Use the following pieces of context to answer the question at the end. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Always say "I couldn't find this information in the uploaded document." if the answer is not present in the context.
    
    Context:
    {context}
    
    Question: {question}
    Answer:"""
    
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    files_chain = prompt | llm
    
    response = files_chain.invoke({"context": context, "question": request.question})
    
    # Deduplicate citations
    citations = list(set([doc.metadata.get("source", "Unknown") for doc in docs]))
    
    return {
        "answer": response.content,
        "citations": citations
    }
