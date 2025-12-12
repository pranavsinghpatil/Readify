# Readify

Transform research PDFs into clean, interactive, AI‑enhanced knowledge sites.

---

## 🚀 Project Vision

Readify makes research accessible. Upload any research PDF and get a beautifully structured website with:

* Semantic summaries
* Beginner‑friendly explanations
* Section navigation
* Q&A on the content
* Ready‑to‑publish GitHub Pages output

---

## 🔍 Problem Statement

Research papers are long, dense, and hard to understand for beginners. PDFs are not mobile‑friendly, not searchable in meaningful ways, and lack interactive exploration tools.

**Readify bridges this gap using AI + layout‑aware extraction.**

---

## ✨ Key Features

* 📄 Accurate PDF layout extraction (headings, tables, equations)
* 🧠 AI‑generated TL;DR, key contributions, limitations
* 🎓 "Explain Like I’m a Student" simplified explanations
* 🔍 Ask questions and get contextual answers
* 🌐 Auto‑generated static website (GitHub Pages)
* 🔗 Sharable links to each section
* 📱 Mobile‑friendly reading experience

---

## 🧩 Tech Stack

* **Python** – main backend
* **FastAPI / Flask** – app API
* **PaddleOCR‑VL** – PDF text + layout extraction
* **ERNIE 4.5 / 5** – summarization, insights, Q&A
* **Jinja2** – HTML templating
* **GitHub Pages** – hosting for generated sites
* **JS/CSS** – lightweight web UI for navigation

---

## 🗂️ Repository Structure

```
readify/
├── backend/
│   ├── ocr_pipeline/
│   ├── ernie_pipeline/
│   ├── api/
│   └── utils/
├── frontend/
│   ├── templates/
│   └── static/
├── docs/
│   ├── ABOUT.md
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   ├── WORKFLOW.md
│   ├── PROMPTS.md
│   └── ROADMAP.md
└── README.md
```

---

## 🏁 Status

Initialization Phase – Documentation & architecture first.

---

## 📌 Next Steps

* Complete detailed documentation in `/docs`
* Setup full environment & dependency guides
* Build OCR → Markdown pipeline
* Add ERNIE enrichment modules
* UI + deployment automation

---

## 📧 Contact

Built solo for the **ERNIE AI Developer Challenge**.

> Making research accessible to everyone.
