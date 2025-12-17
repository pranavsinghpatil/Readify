# PDF2Image: The Pre-processing Step

**Why convert PDF to Image?**
OCR models (like PaddleOCR) work on **images**, not PDF files. Even though some tools accept PDFs, they usually convert them to images internally. We control this step explicitly for quality.

## 🛠 The Tool: `pdf2image`

We use the `pdf2image` Python library, which is a wrapper around `poppler-utils`.

### Installation Note
`poppler` must be installed on the system (OS level).
*   **Linux**: `sudo apt-get install poppler-utils`
*   **Mac**: `brew install poppler`
*   **Windows**: Download binary -> Add to PATH.

## ⚙️ Key Parameters

```python
from pdf2image import convert_from_path

images = convert_from_path(
    'paper.pdf',
    dpi=300,          # Dots Per Inch
    fmt='jpeg',       # Format
    thread_count=4    # Parallel processing
)
```

### 1. DPI (Resolution)
This is the most critical setting.
*   **Too Low (<150)**: Text is blurry. OCR fails.
*   **Too High (>400)**: Image is huge (40MB+). Processing is slow.
*   **Sweet Spot**: **300 DPI**. This is standard print quality and perfect for OCR.

### 2. Format
*   **JPEG**: Good compression, but artifacts *can* hurt text sharpness.
*   **PNG**: Lossless, sharp text, but large file size.
*   **Our Choice**: **JPEG with high quality (95)** for speed, or PNG if accuracy is paramount.

## 🚀 Performance Optimization

Converting a 50-page PDF at 300 DPI takes time.

1.  **Lazy Loading**: Don't convert all pages at once if you don't need to.
2.  **Parallelism**: `thread_count` uses multiple CPU cores.
3.  **Caching**: Save the generated images to a temporary folder (`/tmp/job_id/pages/`). If the pipeline crashes and restarts, check if images already exist.

## ⚠️ Edge Cases

*   **Password Protected PDFs**: `pdf2image` supports `userpw` argument. We currently reject these or ask user for password.
*   **Huge Dimensions**: Some architectural diagrams are 5000x5000. We might need to resize or tile them.
*   **Rotated Pages**: `pdf2image` usually respects the rotation flag in PDF, but sometimes we need to fix it in OCR (PaddleOCR has a direction classifier for this).
