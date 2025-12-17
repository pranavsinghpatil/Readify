# Readify Workflow

This document explains the **end-to-end pipeline** that Readify uses to transform a research PDF into an AI-enhanced static knowledge website.

---

## 🔄 High-Level Workflow Overview

```
PDF → OCR & Layout Extraction → Structuring → AI Enhancement → Static Site → Publish
```

Each step is broken down in detail below.

---

## 🧩 Step-by-Step Breakdown

### **1️⃣ PDF Upload**

* User uploads a research PDF through the Readify UI
* FastAPI stores the file temporarily
* Returns a **job ID** for status tracking (optional for MVP)

**Input:** Original PDF file
**Output:** Local temporary file path

---

### **2️⃣ OCR + Layout Detection (PaddleOCR-VL)**

* Detects **text regions**, **reading order**, **tables**, **figures**, **formulas**
* Outputs a structured JSON including:

  * Coordinates
  * Content
  * Block type (heading, paragraph, table, etc.)

**Input:** PDF file
**Output:** Layout-aware JSON structure

> Future enhancement: directly use PaddleOCR-VL document layout models for higher accuracy.

---

### **3️⃣ Markdown Structuring**

Convert layout JSON → Markdown preserving logical reading order:

* `# Title`
* `## Section`
* Code blocks for formulas (later MathJax support)
* Markdown tables
* `![Figure]` placeholders with extracted images

**Input:** JSON (text blocks + layout)
**Output:** `paper.md` (structured content)

---

### **4️⃣ AI Semantic Enhancement (ERNIE)**

Readify asks ERNIE to enrich the paper with:

* TL;DR (3–5 lines)
* Key contributions
* Limitations / future work
* "Explain Like I'm a Student" simplification
* Metadata (topic domain, reading difficulty, keywords)

Steps:

```
Markdown sections → chunk → send to ERNIE → enrich → merge
```

**Input:** `paper.md`
**Output:** `enhanced_paper.md` + metadata JSON

---

### **5️⃣ Static Site Generation**

Using **Jinja2 templates**, Readify builds:

* Clean typography
* Sidebar navigation (Table of Contents)
* Shareable section anchors
* Mobile-responsive UI

**Output folder example:**

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

### **6️⃣ Deployment (GitHub Pages)**

* New folder inside `readify-sites` repo
* Commit + push using GitHub API
* Final URL constructed:

```
https://<username>.github.io/<site-name>/
```

Return this URL to user.

> MVP alternative: Provide `.zip` download for manual deployment.

---

## 🧪 Testing Each Stage (MVP Strategy)

| Stage         | Test                          | Status UI                |
| ------------- | ----------------------------- | ------------------------ |
| Upload        | Validate PDF format           | "Uploaded ✔"             |
| OCR           | Run on first page only        | "Analyzing layout…"      |
| Markdown      | Save first draft              | "Structuring content…"   |
| ERNIE         | TL;DR only initially          | "Understanding paper…"   |
| Generate site | Render single-page HTML first | "Publishing site…"       |
| Deploy        | Manual + automated later      | "Your Readify is ready!" |

Success feedback is shown at every step to keep users engaged.

---

## 📌 Performance & Optimization Notes

* Cache OCR results for fast reprocessing of same paper
* Parallel OCR for multipage PDFs (async workers)
* Limit ERNIE tokens to avoid latency + API cost
* Lazy-load large images in final site
* Local GPU optional (PaddlePaddle-Build)

---

## 🔐 Privacy Considerations

* Store PDFs temporarily and delete after deployment
* Offer a “Local Only Mode” in future
* Clear data retention messaging in front-end

---

## 🚀 Final Workflow Summary

> **Readify turns complex PDFs into interactive knowledge experiences in minutes using PaddleOCR-VL + ERNIE.**

This workflow is designed for:

* Hackathon feasibility
* Real user needs
* Smooth future enhancements

---
