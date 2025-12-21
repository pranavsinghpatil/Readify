# Module 0: Document Grounder

**Responsibility**: The "Perception" Layer.
Converts a raw PDF binary file into a grounded, addressable `Document` object.

## ⚙️ Implementation Details
*   **Source File**: `backend/reasoning_pipeline/modules/module_0_grounder.py`
*   **Inputs**: PDF Path.
*   **Outputs**: `Document` schema (List of `Section` objects).

### 🛠 Visual Processing Strategy
1.  **Rendering**: Uses `PyMuPDF` (fitz) or `pdf2image` to convert PDF pages to High-Res Images (300 DPI).
2.  **PaddleOCR**: Runs `PaddleOCR` (English model) on each image.
    *   **Detection**: Finds text bounding boxes.
    *   **Classification**: Recognizes text content.
3.  **Fallback**: If PaddleOCR runtime is missing (common in light environments), it falls back to `PyMuPDF` text extraction.

### ⚠️ Known Limitations (v1)
*   **Section Merging**: Currently chunks text by Page (P1, P2...). It does not yet intelligently merge "Section 2.1" if it spans two pages. This is handled downstream by Module 1 (Segmenter).
*   **Tables**: Extracted as raw text blocks, losing some tabular structure.

## 🧪 Testing
Run `python tests/test_pipeline_local.py` (Step 1).
