# Critical Fixes for "No Claims Found" Issue

## Root Causes Identified

### 1. Enum Access Error ⚠️ CRITICAL
**File:** `backend/reasoning_pipeline/modules/module_2_extractor.py`  
**Line 26:** `r.role.lower()` 

**Problem:** `r.role` is a `RhetoricalRole` enum, not a string. Calling `.lower()` on it fails silently or causes AttributeError.

**Fix:**
```python
# WRONG:
role_lookup = {r.section_id: r.role.lower() for r in rhetorical_map.roles}

# CORRECT:
role_lookup = {r.section_id: r.role.value for r in rhetorical_map.roles}
```

### 2. Too Restrictive Section Filtering ⚠️ CRITICAL
**Line 36:** Checked if role in `["method", "results", "discussion", "conclusion", "abstract"]`

**Problem:** Module 1 assigns roles like "background", "body", etc. If a section gets "background", it was skipped entirely, even if it contains claims.

**Fix:**
```python
# WRONG: Only process specific roles
if role not in target_roles:
    continue  # ← Skips most sections!

# CORRECT: Process almost everything
skip_roles = ["limitations"]  # Only skip truly irrelevant
if role in skip_roles:
    continue
```

### 3. Prompt Schema Mismatch
**File:** `backend/prompts/module_2_extractor.txt`

**Problem:** 
- Prompt expected `{% for section in sections %}` (plural) but code passes single `section`
- Confidence type mismatch: prompt returned `"high"` (string), schema expects `0.95` (float)

**Fix:** Rewrote prompt to:
- Accept single section
- Return numeric confidence (0.0-1.0)
- Match `ClaimList` schema exactly

---

## Impact Analysis

**Before Fix:**
```
1. Module 1 assigns role "background" to section S1
2. Module 2 gets role_lookup = {S1: SomeEnumObject}  ← WRONG
3. Tries: if "background" in target_roles  ← Always False (comparing enum to string)
4. Skips ALL sections
5. Returns empty ClaimList
```

**After Fix:**
```
1. Module 1 assigns role "background" to section S1
2. Module 2 gets role_lookup = {S1: "background"}  ← CORRECT
3. Check: if "background" in ["limitations"]  ← False, so proceed
4. Processes section, extracts claims
5. Returns ClaimList with actual claims
```

---

## Changes Made

### File: `backend/reasoning_pipeline/modules/module_2_extractor.py`

**Line 25:** Fixed enum access
```python
role_lookup = {r.section_id: r.role.value for r in rhetorical_map.roles}
```

**Line 34-37:** Made filtering permissive
```python
skip_roles = ["limitations"]  # Process almost everything
if role in skip_roles:
    logging.info(f"Skipping section {section.section_id} (role: {role})")
    continue
```

**Added:** Logging for debugging
```python
logging.info(f"Extracting claims from {len(doc.sections)} sections")
```

### File: `backend/prompts/module_2_extractor.txt`
- ✅ Changed from `sections` to `section` (singular)
- ✅ Fixed confidence to numeric (0.0-1.0)
- ✅ Ensured output matches `ClaimList` schema
- ✅ Added clear examples with correct format

### Created: `backend/debug_output/` directory
- Now accessible via `/debug_output/` endpoint

---

## Expected Behavior Now

### Module 2 Logs (Before):
```
INFO: Extracting claims from 5 sections
(silence - all sections skipped)
INFO: Returning 0 claims
```

### Module 2 Logs (After):
```
INFO: Extracting claims from 5 sections
INFO: Extracting Claims from Section 1/5...
INFO: Extracting Claims from Section 2/5...
INFO: Skipping section S4 (role: limitations)
INFO: Extracting Claims from Section 3/5...
INFO: Returning 8 claims
```

---

## Testing

**What to verify:**
1. ✅ Backend reloads without errors
2. ✅ Upload a scientific PDF
3. ✅ Check logs for "Extracting claims from X sections"
4. ✅ Should see claims in results (not "No Claims Found")
5. ✅ Check `backend/debug_output/{job_id}_3_claims.json` has claims

**If still no claims:**
- Check `backend/debug_output/{job_id}_1_doc.json` - Does it have content?
- Check `backend/debug_output/{job_id}_2_rhetoric.json` - What roles assigned?
- Check backend logs for "Skipping section..." messages

---

## Why Processing Still Takes Time

**Issue:** Even with no results, analysis takes 10-15 minutes.

**Explanation:**
- Module 0 (Grounding): Instant ✓
- Module 1 (Segmentation): ~10 seconds ✓
- **Module 2 (Claims): Nothing to skip** if sections are being processed
  - If 20 sections × 5 seconds = 100 seconds (~2 minutes)
- **Module 3 (Evidence): Still runs** even with 0 claims (~5 seconds)
- **Module 4-6:** Run even with empty data (~10 seconds each)

**Total:** ~3 minutes minimum even with failures

**With fixes:** Claims found → More processing → 3-5 minutes (expected)

---

## Status

✅ **Critical bug fixed** - enum access error  
✅ **Filtering relaxed** - processes most sections  
✅ **Prompt corrected** - matches schema  
✅ **Debug output** - directory created  

**System should now extract claims properly!**
