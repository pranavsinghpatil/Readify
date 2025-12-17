# Readify Architecture

This document describes the system architecture of **Readify** — how each component works together to transform a research PDF into an interactive, AI-enhanced knowledge website.

---

## 🧱 High-Level System Overview

```
        ┌─────────────────┐
        │   Web Frontend  │  (Upload PDF & View Result)
        └───────┬─────────┘
                │ 1. PDF Upload
                ▼
        ┌─────────────────┐
        │    FastAPI      │  Backend Orchestrator
        └───────┬─────────┘
                │
                │ 2. OCR + Layout Extraction
                ▼
        ┌─────────────────┐
        │ PaddleOCR-VL     │
        │ (Local/API)      │
        └───────┬─────────┘
                │ Output: structured JSON
                ▼
        ┌─────────────────┐
        │ Markdown Builder │
        └───────┬─────────┘
                │
                │ 3. Semantic Enhancement
                ▼
        ┌──────────────────┐
        │ ERNIE 4.5 / 5 AI │ Summaries, insights, Q&A
        └───────┬──────────┘
                │ Output: enriched markdown + metadata
                ▼
        ┌──────────────────┐
        │ Static Site Maker │ HTML + CSS generation
        └───────┬──────────┘
                │ 4. Deploy
                ▼
        ┌──────────────────┐
        │ GitHub Pages Host │
        └──────────────────┘
```

---

## 🔧 Component Breakdown

### **Frontend Layer**

* PDF upload form
* Status updates (progress msgs)
* Link to generated knowledge site
* Tech: HTML/CSS/JS → Progressive enhancement later

### **Backend Layer** (FastAPI)

| Module             | Responsibility                                   |
| ------------------ | ------------------------------------------------ |
| `ocr_pipeline/`    | Run PaddleOCR-VL & return layout JSON            |
| `parser/`          | Convert JSON to structured Markdown              |
| `ernie_pipeline/`  | Summaries, TL;DR, ELI5, insights, Q&A generation |
| `static_renderer/` | Build site using Jinja2 templates                |
| `deploy/`          | Push to GitHub repo (Pages)                      |
| `utils/`           | Helpers: file mgmt, caching, logging             |

### **AI Layer**

* **PaddleOCR-VL** for document layout intelligence
* **ERNIE 4.5/5** for:

  * Content understanding
  * Summaries, simplification
  * Key contributions, limitations
  * Context-aware Q&A

### **Hosting Layer**

* GitHub Pages for final site
* Optional: local download as `.zip`

---

## 🔄 Data Flow Model

1️⃣ **Upload**: User sends PDF → FastAPI stores temporarily
2️⃣ **Extract**: PaddleOCR-VL → text blocks, headings, tables, math
3️⃣ **Structure**: Markdown builder organizes sections + hierarchy
4️⃣ **Enhance**: ERNIE adds:

* TL;DR
* Key insights
* Beginner explanations
* Metadata
  5️⃣ **Generate**: HTML/CSS site created per template
  6️⃣ **Deploy**:
* Push to GitHub repo → GitHub Pages URL returned

---

## 📦 Final Output Format

Each generated site contains:

```
site/
├── index.html
├── content/
│   ├── sections.html
│   └── figures/
├── assets/
│   ├── styles.css
│   └── scripts.js
└── metadata.json
```

---

## ⚙️ Future Enhancements

* Full RAG-based Q&A
* Multi-paper comparison graph
* User accounts + saved papers
* Local deployment option (privacy mode)

---

Readify’s architecture balances **hackathon deliverability** with **long-term scalability**. 🚀
