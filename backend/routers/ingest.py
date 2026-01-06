from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.ingestion import process_file
from backend.database import get_collection
from backend.services.llm_provider import LLMProvider
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
import os

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    provider = LLMProvider()
    # Check keys based on provider
    if provider.provider == "openai" and not os.getenv("OPENAI_API_KEY"):
         raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured.")
    if provider.provider == "gemini" and not os.getenv("GOOGLE_API_KEY"):
         raise HTTPException(status_code=500, detail="GOOGLE_API_KEY not configured.")
         
    try:
        chunks = await process_file(file)
        if not chunks:
             raise HTTPException(status_code=400, detail="No content extracted from file.")

        collection = get_collection()
        if collection is None:
             raise HTTPException(status_code=500, detail="Database not configured.")

        embeddings = provider.get_embeddings()
        vector_store = MongoDBAtlasVectorSearch(
            collection=collection,
            embedding=embeddings,
            index_name="vector_index",
            text_key="text",
            embedding_key="embedding",
        )
        
        vector_store.add_documents(chunks)
        
        return {
            "status": "success",
            "filename": file.filename,
            "chunks_processed": len(chunks),
            "message": f"File uploaded and indexed using {provider.provider}."
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
