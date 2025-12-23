# Developer Setup Guide

This document details how to set up the development environment for SCARF.

## 🐍 Python Environment

We use strict versioning to ensure stability with `paddleocr` and `fastapi`.

1.  **Create Virtual Environment**:
    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```

2.  **Install Dependencies**:
    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```
    *Note: If you encounter `paddlepaddle` errors on Windows, ensure you have the correct C++ Redistributable installed.*

## 🏗 Module Implementation Details

### Module 0: Grounder
*   **Engine**: PaddleOCR + PyMuPDF.
*   **Fallback**: If Paddle fails (missing DLLs), it falls back to PyMuPDF text extraction.
*   **Output**: `Document` object with `Section` list.

### Module 1: Segmenter
*   **Engine**: ERNIE 4.5 via Novita AI.
*   **Logic**: Iterates over each section, assigning a role (`background`, `method`, etc.).
*   **Robustness**: Uses a `repair_json` utility to handle Markdown code fences from LLM.

### Module 2: Extractor
*   **Logic**: Filters `Document` for sections classified as `method`, `results`, or `discussion`.
*   **Chunking**: Sends section text to ERNIE to extract `ScientificClaim` objects.
