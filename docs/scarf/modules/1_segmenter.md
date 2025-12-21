# Module 1: Rhetorical Segmenter

**Responsibility**: The "Structural" Layer.
Assigns a functional role to each section of the document.

## ⚙️ Implementation Details
*   **Source File**: `backend/reasoning_pipeline/modules/module_1_segmenter.py`
*   **Inputs**: `Document` object.
*   **Outputs**: `RhetoricalMap` (List of roles: `background`, `method`, `results`, `discussion`, `limitations`).

### 🧠 Logic
1.  **Iteration**: Loops through every `Section` in the document.
2.  **Prompting**: Sends the section text (or first 1000 chars) to ERNIE 4.5.
3.  **Prompt**: `backend/prompts/module_1_segmenter.txt`
4.  **Repair**: Uses `utils.repair_json` to fix common LLM formatting errors before parsing.

### 🎯 Use Case
This module allows downstream modules to be efficient. For example, the `Evidence Linker` only needs to look at `results` sections, ignoring `intro`.

## 🧪 Testing
Run `python tests/test_pipeline_local.py` (Step 2).
