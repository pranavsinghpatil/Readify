import os
from dotenv import load_dotenv
from pathlib import Path
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_groq import ChatGroq

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

class LLMProvider:
    def __init__(self):
        # DEFAULT TO GEMINI as per user request
        self.provider = os.getenv("LLM_PROVIDER", "gemini").lower()
        self.api_key = self._get_api_key()

    def _get_api_key(self):
        if self.provider == "gemini":
            return os.getenv("GOOGLE_API_KEY")
        elif self.provider == "openai":
            return os.getenv("OPENAI_API_KEY")
        elif self.provider == "groq":
            return os.getenv("GROQ_API_KEY")
        return None

    def is_configured(self):
        return bool(self.api_key)

    def get_embeddings(self):
        if self.provider == "gemini":
            if not os.getenv("GOOGLE_API_KEY"):
                raise ValueError("GOOGLE_API_KEY is missing. Please check backend/.env")
            # text-embedding-004 was shut down on Jan 14, 2026. Migrating to 005.
            return GoogleGenerativeAIEmbeddings(model="models/text-embedding-005")
        elif self.provider == "openai":
            if not os.getenv("OPENAI_API_KEY"):
                raise ValueError("OPENAI_API_KEY is missing. Please check backend/.env")
            return OpenAIEmbeddings(model="text-embedding-3-small")
        elif self.provider == "groq":
            # Groq does not provide embeddings yet, so we treat it as a mix.
            # We will use Google Embeddings as the default partner for Groq due to speed/cost alignment.
            if os.getenv("GOOGLE_API_KEY"):
                 return GoogleGenerativeAIEmbeddings(model="models/text-embedding-005")
            elif os.getenv("OPENAI_API_KEY"):
                return OpenAIEmbeddings(model="text-embedding-3-small")
            else:
                raise ValueError("To use Groq, you must also provide GOOGLE_API_KEY or OPENAI_API_KEY for embeddings.")
        
        raise ValueError(f"Unsupported provider: {self.provider}")

    def get_chat_model(self):
        if self.provider == "gemini":
            if not os.getenv("GOOGLE_API_KEY"):
                raise ValueError("GOOGLE_API_KEY is missing. Please check backend/.env")
            # Updated to Gemini 2.5 Flash for 2026 context
            return ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
        elif self.provider == "openai":
            if not os.getenv("OPENAI_API_KEY"):
                raise ValueError("OPENAI_API_KEY is missing. Please check backend/.env")
            return ChatOpenAI(model="gpt-4o", temperature=0)
        elif self.provider == "groq":
            if not os.getenv("GROQ_API_KEY"):
                raise ValueError("GROQ_API_KEY is missing. Please check backend/.env")
            # Using Llama 3 70b as a strong default on Groq
            return ChatGroq(model_name="llama3-70b-8192", temperature=0)
            
        raise ValueError(f"Unsupported provider: {self.provider}")

    def get_dimension(self):
        if self.provider == "gemini":
            return 768
        elif self.provider == "openai":
            return 1536
        elif self.provider == "groq":
             # Matches the embedding provider logic above
            if os.getenv("GOOGLE_API_KEY"):
                return 768
            elif os.getenv("OPENAI_API_KEY"):
                return 1536
        return 768
