# Module 2: Claim Extractor

**Responsibility**: The "Statement" Layer.
Identifies the core scientific contributions asserted by the paper.

## ⚙️ Implementation Details
*   **Source File**: `backend/reasoning_pipeline/modules/module_2_extractor.py`
*   **Inputs**: `Document` + `RhetoricalMap`.
*   **Outputs**: `ClaimList` (List of `ScientificClaim` objects).

### 🧠 Logic
1.  **Filtering**: Only processes sections labeled `method`, `results`, `discussion`, or `abstract`.
2.  **Normalization**: The prompt instructs ERNIE to rewrite complex sentences into atomic "Claims" (declarative statements).
3.  **Prompt**: `backend/prompts/module_2_claims.txt`

### 🔍 Key Feature: Atomic Claims
We do not want paragraphs. We want:
*   *"The proposed model achieves 98% accuracy."* (Good)
*   *"We ran experiments and found good results."* (Bad - too vague)

## 🧪 Testing
Run `python tests/test_pipeline_local.py` (Step 3).
