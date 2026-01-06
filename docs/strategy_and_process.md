# Readify - Strategic & Process Documentation

## 1. Project Overview
**Goal**: Build a web-based AI assistant (RAG) that allows users to upload documents and ask questions answered strictly based on content.

**Strategy**:
- **Dual-Engine Approach**: Develop using **Google Gemini (Free Tier)** for cost-effective development and testing, while maintaining full compatibility with **OpenAI** for the final premium submission.
- **Premium User Experience**: Invest heavily in a "Wow" factor frontend using Next.js and Glassmorphism to differentiate from standard intern assignments.
- **Robust Engineering**: strict separation of concerns (Frontend vs Backend), strong typing (TypeScript/Pydantic), and modular services (Ingestion vs Chat).

## 2. Technology Stack & Rationale

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Frontend** | **Next.js 14 (React)** | Server-side rendering, top-tier performance, and easier deployment. |
| **Styling** | **Tailwind CSS** | Rapid UI development with a custom premium design system. |
| **Backend** | **FastAPI (Python)** | High-performance async support, native Pydantic validation, and excellent AI library ecosystem. |
| **Database** | **MongoDB Atlas** | Native Vector Search capability eliminates the need for a separate vector DB (like Pinecone). |
| **LLM Engine** | **Gemini Flash / OpenAI GPT-4o** | Configurable provider allows zero-cost dev (Gemini) and high-quality prod (GPT-4o). |
| **Orchestration**| **LangChain** | Standardizes the interface for RAG, making swapping LLMs trivial. |

## 3. Development Timeline

| Phase | Duration | Status | Description |
|-------|----------|--------|-------------|
| **1. Planning** | 1 Hour | ✅ | Requirements analysis, stack selection, and architecture design. |
| **2. Core Backend** | 2 Hours | ✅ | API setup, file ingestion logic, database routing, and RAG service. |
| **3. UI Implementation** | 3 Hours | 🚧 | Frontend construction with responsive design and animations. |
| **4. Integration** | 1 Hour | ⏳ | Connecting Frontend to Backend, testing edge cases (bad files, empty queries). |
| **5. Polish & Docs** | 1 Hour | ⏳ | Final UI tweaks, comprehensive documentation, and video demo recording. |

## 4. Engineering Process

### Git Workflow
- **Main Branch**: Production-ready code.
- **Feature Branches**: Isolated development (e.g., `feature/ui-polish`, `fix/upload-error`).
- **Commit Strategy**: Atomic commits with descriptive messages.

### Quality Assurance (QA)
1.  **Ingestion Test**: Upload complex PDFs (tables, columns) and verify text extraction.
2.  **Citation Test**: Query specific facts and ensure the citation metadata returns the correct filename.
3.  **Hallucination Test**: Ask questions *not* in the document. Expected output: "I couldn't find this information..."
4.  **UI Stress Test**: Rapidly switch between chats and uploads to test state stability.
