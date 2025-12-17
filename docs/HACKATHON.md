# ERNIE AI Developer Challenge – Hackathon Catalogue

This document collects all essential information, tools, and resources provided for the ERNIE AI Developer Challenge.

---

## 🏆 Overview

* **Organizer:** Baidu (Hong Kong) with community partners
* **Challenge Goal:** Build intelligent solutions using **ERNIE** models and **PaddleOCR-VL**
* **Open to:** Individuals or teams globally (some regions restricted)
* **Prize Pool:** $10,000 total
* **Submission:** By deadline with demo video and repository access

---

## 🧩 Task Types & What to Build

### 1️⃣ Warm-Up Task

* Use **PaddleOCR-VL** to extract text & layout from a PDF
* Convert to Markdown
* Use ERNIE model to generate a web page
* Deploy final website on GitHub Pages

### 2️⃣ Model-Building Tasks

Fine-tune one of:

* ERNIE models using **Unsloth** or **LLaMA-Factory**
* PaddleOCR-VL document model

Release:

* Open-source model weights
* Training code + hyperparameters + dataset description
* 5-minute demo video

Suggested Domains:

* Low-resource languages
* Finance & economics
* Literature & creative writing
* Civil & architectural engineering
* Computer science & mechanical engineering
* Niche or unique scenarios also welcomed

### 3️⃣ Application-Building Tasks

Build innovative apps using:

* ERNIE / PaddleOCR-VL
* Multimodal via Baidu AI Studio or Novita
* Edge AI or robotics using **D-Robotics** kits
* Multi-agent systems using **CAMEL-AI**

Suggested industries:

* Lifestyle & entertainment
* Culture & media
* E-commerce & marketing
* Smart education & productivity
* Public welfare / social innovation
* Robotics transformation & new interactive devices

> No strict boundaries — choose any direction and innovate.

---

## 🔧 Tools & Technologies

Use any of the following:

* ERNIE 5, ERNIE 4.5 (text or multimodal)
* PaddleOCR-VL
* APIs or on-device models

### Resources


#### Novita AI

* **$25 credits** for GPUs + LLM usage
* Register: [https://novita.ai/ernie](https://novita.ai/ernie)

#### D-Robotics

* **10 free RDK X5 kits** for Edge AI & Robotics track (first-come basis)
* Apply: [https://forms.gle/No78STpmr6pWJ4Sd8](https://forms.gle/No78STpmr6pWJ4Sd8)

---

## 📚 Tutorials & Helpful Links

### Warm-Up Task

* Doc2Page via PaddleOCR: [https://huggingface.co/spaces/PaddlePaddle/doc2page](https://huggingface.co/spaces/PaddlePaddle/doc2page)

### Model-Building

* PaddleOCR-VL Finetune using ERNIEKit (GitHub):
  [https://github.com/PaddlePaddle/ERNIE/blob/release/v1.4/docs/paddleocr_vl_sft.md](https://github.com/PaddlePaddle/ERNIE/blob/release/v1.4/docs/paddleocr_vl_sft.md)

* PaddleOCR-VL SFT (Colab):
  [https://colab.research.google.com/drive/1yjbH1zbvBlyUq1wz0pohPaWKHO6szAXb?usp=sharing](https://colab.research.google.com/drive/1yjbH1zbvBlyUq1wz0pohPaWKHO6szAXb?usp=sharing)

* ERNIE Fine-Tune using **LLaMA-Factory**:

  * ERNIE-VL: [https://github.com/hiyouga/LLaMA-Factory/pull/9521](https://github.com/hiyouga/LLaMA-Factory/pull/9521)
  * ERNIE Text: [https://github.com/hiyouga/LLaMA-Factory/pull/9165](https://github.com/hiyouga/LLaMA-Factory/pull/9165)

* ERNIE Fine-Tune using **Unsloth**:
  [https://github.com/unslothai/notebooks/pull/139](https://github.com/unslothai/notebooks/pull/139)

* Google Colab:

  * ERNIE-VL:
    [https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_VL_28B_A3B_PT_Vision.ipynb](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_VL_28B_A3B_PT_Vision.ipynb)
  * ERNIE Text:
    [https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_21B_A3B_PT-Conversational.ipynb](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_21B_A3B_PT-Conversational.ipynb)

* AMD Versions:

  * ERNIE-VL: [https://oneclickamd.ai/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_VL_28B_A3B_PT_Vision.ipynb](https://oneclickamd.ai/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_VL_28B_A3B_PT_Vision.ipynb)
  * ERNIE Text: [https://oneclickamd.ai/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_21B_A3B_PT-Conversational.ipynb](https://oneclickamd.ai/github/unslothai/notebooks/blob/main/nb/ERNIE_4_5_21B_A3B_PT-Conversational.ipynb)

### Application-Building

* Baidu AI Studio API Docs:

  * ERNIE: [https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf](https://ai.baidu.com/ai-doc/AISTUDIO/Mmhslv9lf)
  * PaddleOCR-VL: [https://ai.baidu.com/ai-doc/AISTUDIO/Dmh4onssk](https://ai.baidu.com/ai-doc/AISTUDIO/Dmh4onssk)

* Novita AI API Docs:

  * ERNIE: [https://blogs.novita.ai/how-to-access-ernie-4-5-effortless-ways-via-web-api-and-code/](https://blogs.novita.ai/how-to-access-ernie-4-5-effortless-ways-via-web-api-and-code/)
  * PaddleOCR: [https://blogs.novita.ai/paddleocr-on-novita-ai/](https://blogs.novita.ai/paddleocr-on-novita-ai/)

* D-Robotics RDK PaddleOCR:
  [https://github.com/D-Robotics/rdk_model_zoo/tree/main/demos/OCR/PaddleOCR](https://github.com/D-Robotics/rdk_model_zoo/tree/main/demos/OCR/PaddleOCR)

* CAMEL-AI with ERNIE:
  [https://github.com/camel-ai/camel/blob/master/examples/models/ernie_model_example.py](https://github.com/camel-ai/camel/blob/master/examples/models/ernie_model_example.py)

---

## 🎥 Submission Requirements

* Working demo URL or deployed website
* Public GitHub repo with full source code
* Project description on Devpost
* ≤ 5-minute demonstration video
* Add judges’ access if private

---

## 🧑‍⚖️ Judging (High-Level)

* Completeness & functionality
* Innovation & real-world impact
* Technical quality
* UX design & clarity of presentation

---

## 📨 Contact & Support

* Discord/Community support channels (varies per region)
* Organizers reachable via email shown on Devpost

---

This catalogue ensures you have **everything needed** to participate and plan competitively.

Explore, innovate — and have fun building with ERNIE + PaddleOCR-VL! 🚀
