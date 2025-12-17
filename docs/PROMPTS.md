# Readify ERNIE Prompt Library

This file contains all reusable prompts for interacting with ERNIE 4.5/5 via Novita AI.
Designed for:
✔ Clear structure
✔ Hybrid summarization (bullets + short intro)
✔ Low hallucination
✔ Section-aware reasoning

Variables are wrapped in `{BRACES}` and will be replaced dynamically.

---

## 🧠 Global Prompt Rules

Always include these when calling ERNIE:

* Ask the model to **only use provided context**
* Ask for citations using section numbers (not external knowledge)
* Limit response length for speed

Example prefix for all prompts:

```
You are Readify, an AI assistant that helps users understand research papers.
Use ONLY the information from the provided paper content. Do not make up facts.
If information is missing, respond: "Not found in the paper."
Keep the language simple and clear.
```

---

## 📌 TL;DR Summary (Hybrid Style)

```
Summarize the following research section.
Provide a short intro paragraph (2–3 lines) followed by 3–5 bullet points.
Be precise and factual.

Content:
{TEXT}
```

---

## ✨ Key Contributions

```
Extract ONLY the key contributions from the paper.
Write 4–6 bullet points.
Each bullet must start with a strong action verb.
Keep it factual and sourced from the content.

Content:
{TEXT}
```

---

## 🚧 Limitations + Future Work

```
Identify limitations or future work from the paper.
If not explicitly stated, infer safely from constraints mentioned.
Write 3–5 bullet points.

Content:
{TEXT}
```

---

## 🎓 Explain Like I’m a Student (Beginner Mode)

```
Explain the following content in a way a beginner or student can understand.
Avoid jargon. Use simple analogies only when they are accurate.
Keep to 5–8 short sentences.

Content:
{TEXT}
```

---

## 🔖 Section Title Refinement

```
Rewrite the following heading to be clearer and more descriptive.
Keep it under 7 words.

Heading:
{TITLE}
```

---

## 🔍 Metadata Extraction

```
Analyze the content and classify:
- Topic domain
- Difficulty level (Beginner/Intermediate/Advanced)
- 5 relevant keywords
Return JSON only:
{
  "domain": "...",
  "difficulty": "...",
  "keywords": ["...", "...", "...", "...", "..."]
}

Content:
{TEXT}
```

---

## ❓ Q&A with Context

```
Answer the user's question using ONLY the context below.
If answer is unclear or missing, say: "Not found in the paper."
Keep answer under 6 sentences.

Context:
{CONTEXT}

Question:
{QUESTION}
```

---

## 🧱 Token + Chunking Strategy (Backend Notes)

* Split PDF into sections by headings
* Each AI request ≤ ~1500 tokens input
* Cache previous ERNIE calls to avoid cost
* Only trigger Q&A when user asks question

Proposed chunking heuristic:

| Section Type  | Max Characters                      |
| ------------- | ----------------------------------- |
| Abstract      | 2,000                               |
| Main sections | 5,000                               |
| Tables        | inline or referenced by placeholder |
| Formulas      | converted to latex blocks           |

---

## ✔️ Hallucination Reduction Controls

Include one or more instructions:

* "If uncertain, say: Not found in the paper."
* "Cite using section names from context only."
* "Do not assume results beyond what is written."

---

## 🧪 Validation Criteria for Responses

Use in backend checks:

* Length matches requested limits
* No external references
* Must contain bullets when requested
* JSON passes parsing test (if metadata)

---

With these prompts, Readify will deliver:

> Accurate insights, structured clarity, and trustworthy explanations.
