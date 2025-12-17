# ERNIE API Integration

**What is ERNIE?**
ERNIE (Enhanced Representation through Knowledge Integration) is Baidu's flagship LLM. It rivals GPT-4 in capability, especially in Chinese and English tasks.

**Why Novita AI?**
We access ERNIE through **Novita AI**, which provides a standard OpenAI-compatible API layer. This makes integration incredibly easy.

## 🔌 The API Interface

Since Novita mimics the OpenAI format, we can use the `openai` Python SDK or raw `requests`. We prefer `requests` for transparency and fewer dependencies.

### Basic Call Structure

```python
import requests
import os

def call_ernie(prompt: str):
    url = "https://api.novita.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.getenv('NOVITA_API_KEY')}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "ernie-4.5",  # or specific version
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }
    
    response = requests.post(url, json=data, headers=headers)
    return response.json()['choices'][0]['message']['content']
```

## 🧠 Prompt Engineering for Research

We don't just say "Summarize this." We use structured prompts (see `docs/PROMPTS.md`).

### 1. The "Explain Like I'm a Student" Prompt
```text
You are a helpful tutor. Explain the following text from a research paper to a computer science undergraduate.
Use analogies. Avoid jargon or define it if necessary.
Text: {text_chunk}
```

### 2. The "Key Contributions" Prompt
```text
Extract the core contributions of this paper as a bulleted list.
Focus on what is NOVEL.
Text: {full_text}
```

## 🛡 Error Handling

APIs fail. We must handle:
1.  **Rate Limits (429)**: Implement exponential backoff (wait 2s, 4s, 8s...).
2.  **Context Window Limits**: ERNIE has a large context, but a 50-page paper might still exceed it.
    *   **Strategy**: Chunking. Split paper into sections -> Summarize each -> Summarize the summaries (Map-Reduce).
3.  **Hallucination**: The model might make things up.
    *   **Grounding**: We tell the model "Answer ONLY based on the provided text."

## 🔄 Streaming Responses

For the Q&A feature, we want the answer to type out in real-time.
We use **Server-Sent Events (SSE)**.

```python
# In FastAPI
from fastapi.responses import StreamingResponse

async def stream_ernie(prompt):
    # ... request with stream=True ...
    for line in response.iter_lines():
        yield line
```

This makes the UI feel instant and responsive.
