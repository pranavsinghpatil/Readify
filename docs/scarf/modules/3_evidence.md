# Advanced Modules (3–6): Reasoning & Critique

These modules form the "Cognitive Core" of SCARF.

## 🔗 Module 3: Evidence Linker
*   **Goal**: Verify if a Claim has proof.
*   **File**: `module_3_evidence.py`
*   **Logic**:
    *   For each Claim, scan `Results` sections.
    *   Ask: "Does this text support this claim?"
    *   Output: `EvidenceGraph` (Claim -> [Evidence 1, Evidence 2]).
*   **Prompt**: `module_3_evidence.txt`

## 🧱 Module 4: Assumption Miner
*   **Goal**: Find hidden dependencies.
*   **File**: `module_4_assumptions.py`
*   **Logic**:
    *   Read `Method` and `Introduction`.
    *   Infer: "What must be true for this to work?" (e.g., "Assumes data is i.i.d.").
    *   Output: `AssumptionLedger`.
*   **Prompt**: `module_4_assumptions.txt`

## ⚠️ Module 5: Gap Analyzer
*   **Goal**: Synthesis.
*   **File**: `module_5_gaps.py`
*   **Logic**:
    *   Input: Claims + Evidence + Assumptions.
    *   Task: Identify weak links (Claim with no Evidence, or strong Assumption).
    *   Output: `GapAnalysis` (List of `GapSignal`).
*   **Prompt**: `module_5_gaps.txt`

## ❓ Module 6: Validation Synthesizer
*   **Goal**: Actionable Feedback.
*   **File**: `module_6_validation.py`
*   **Logic**:
    *   Convert `GapSignal` into a research question.
    *   Example: Gap="No baseline comparison" -> Q="How does this compare to SOTA on ImageNet?"
    *   Output: `ValidationReport`.
*   **Prompt**: `module_6_validation.txt`
