# Readify Tech Stack Handbook

Welcome to the technical deep-dive of Readify. This folder contains detailed documentation for every core technology used in the project.

These guides are written to be **practical, advanced, and specific to Readify**. They go beyond "Hello World" to explain *why* we use these tools and *how* they solve our specific problems (PDF parsing, AI enrichment, static site generation).

## 📚 Documentation Index

### Core Language & Backend
*   **[Python (python.md)](./python.md)**: Advanced Python patterns, type hinting, and performance optimization used in our backend.
*   **[FastAPI (fastapi.md)](./fastapi.md)**: Building high-performance async APIs, dependency injection, and Pydantic validation.
*   **[Requests (requests.md)](./requests.md)**: Robust HTTP client usage for communicating with Novita AI and GitHub APIs.
*   **[Dotenv (dotenv.md)](./dotenv.md)**: Security best practices for managing API keys and environment variables.

### OCR & Document Understanding
*   **[PaddleOCR (paddleocr.md)](./paddleocr.md)**: The engine behind text extraction. How it works and how we tune it.
*   **[PaddleOCR-VL (paddleocr-vl.md)](./paddleocr-vl.md)**: Layout-aware document understanding. Preserving tables, headers, and structure.
*   **[PDF2Image (pdf2image.md)](./pdf2image.md)**: The critical pre-processing step converting PDFs to high-res images for OCR.

### AI & Intelligence
*   **[ERNIE API (ernie-api.md)](./ernie-api.md)**: Integrating Baidu's ERNIE model via Novita AI for summarization, simplification, and Q&A.

### Frontend & Static Site Generation
*   **[Jinja2 (jinja2.md)](./jinja2.md)**: The templating engine that turns raw data into beautiful, static HTML pages.
*   **[CSS (css.md)](./css.md)**: Our styling strategy for clean, readable, and responsive research papers.
*   **[JavaScript (javascript.md)](./javascript.md)**: Adding interactivity (TOC, smooth scroll, dynamic Q&A) without a heavy framework.

### Deployment
*   **[GitHub Pages (github-pages.md)](./github-pages.md)**: Automating the publishing of generated sites directly to the web.

---

## 🧭 How to use this handbook

1.  **New to the project?** Start with `python.md` and `fastapi.md` to understand the codebase foundation.
2.  **Working on the core pipeline?** Read `pdf2image.md` -> `paddleocr.md` -> `paddleocr-vl.md`.
3.  **Improving the output?** Focus on `jinja2.md`, `css.md`, and `javascript.md`.
4.  **Debugging AI?** Check `ernie-api.md`.

*This documentation is a living part of the project. Update it as you learn new tricks or change architectural decisions.*
