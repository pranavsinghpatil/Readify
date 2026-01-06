# Readify - Engineering Guide

## 1. Architecture Diagram

```mermaid
graph TD
    User[Web Client] <-->|HTTP/JSON| Frontend[Next.js App]
    Frontend <-->|API Calls| Backend[FastAPI Server]
    
    subgraph "Backend Services"
        Backend --> Ingest[Ingestion Service]
        Backend --> Chat[Chat Service]
        Ingest -->|Chunk & Embed| LLM[LLM Provider (Gemini/OpenAI)]
        Chat -->|Context & Query| LLM
    end
    
    subgraph "Data Persistence"
        Backend <-->|Store/Retrieve Vectors| MongoDB[(MongoDB Atlas)]
        Ingest -->|Save File| LocalStorage[Disk /uploads]
    end
```

## 2. Directory Structure

```
Readify/
├── backend/                 # Python FastAPI Server
│   ├── main.py             # Entry point
│   ├── services/           # Business Logic
│   │   ├── ingestion.py    # File processing & chunking
│   │   └── llm_provider.py # Switcher for Gemini/OpenAI
│   └── routers/            # API Endpoints
├── frontend/                # Next.js 14 Client
│   ├── app/                # Pages & Layouts
│   ├── components/         # Reusable UI Components
│   └── lib/                # API Utilities
├── docs/                    # Documentation
└── uploads/                 # Local storage for raw files
```

## 3. Key Components

### A. Ingestion Engine (`services/ingestion.py`)
- **Loaders**: Auto-detects file type (PDF, DOCX, TXT, MD) and uses appropriate LangChain loader.
- **Splitter**: `RecursiveCharacterTextSplitter` with 3000 char chunks and 200 overlap to maintain context window.
- **Metadata**: Tags every chunk with `source` (filename).

### B. LLM Provider (`services/llm_provider.py`)
- **Factory Pattern**: Abstracts the underlying AI service.
- **Environment Driven**: Checks `LLM_PROVIDER` in `.env` to instantiate either `ChatGoogleGenerativeAI` or `ChatOpenAI`.
- **Safety**: Validates API keys on instantiation.

### C. Vector Store (MongoDB Atlas)
- **Hybrid Search**: We use Atlas Vector Search.
- **Embedding Dimensions**:
    - Gemini: `768` dimensions.
    - OpenAI: `1536` dimensions.
    - *Critical*: The Index MUST match the dimension of the active provider.

## 4. API Reference

### `POST /api/upload`
- **Body**: `multipart/form-data` with key `file`.
- **Response**: `{ status: "success", filename: "...", chunks_processed: 15 }`

### `POST /api/query`
- **Body**: `{ question: "What is the goal?" }`
- **Response**: `{ answer: "The goal is...", citations: ["doc.pdf"] }`
