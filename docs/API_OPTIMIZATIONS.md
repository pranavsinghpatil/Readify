# Real API Optimizations for Reliability

## Changes Made to Handle Network Issues

### 1. Faster Default Model
**Before:** `baidu/ernie-4.5-vl-28b-a3b-thinking` (slow, heavy)  
**After:** `baidu/ernie-4.5-vl-28b-a3b` (faster, more reliable)  
**Reason:** "Thinking" models take longer to respond, increasing timeout risk

### 2. Better Fallback Model
**Before:** Same model as primary  
**After:** `baidu/ernie-4.0-turbo-8k` (specifically designed for speed)  
**Reason:** True fallback that's faster if primary fails

### 3. Increased Timeouts
**Before:** 60 seconds  
**After:** 
- Primary: 120 seconds (2 minutes)
- Fallback: 90 seconds  
**Reason:** Network instability needs more time

### 4. More Aggressive Retries
**Before:** 3 retries, 1s backoff  
**After:** 5 retries, 2s backoff (exponential)  
**Reason:** Flaky networks need more patience

### 5. Better Error Codes
**Before:** Handled [429, 500, 502, 503, 504]  
**After:** Also handles [520, 524] (Cloudflare errors)  
**Reason:** API behind Cloudflare proxy

### 6. Detailed Logging
**Added:**
- Model name on each call
- Response size confirmation
- Specific timeout vs error messages
- Clear fallback indicators

**Benefit:** Easy to diagnose issues in logs

---

## Expected Behavior Now

### Good Network:
```
INFO: ErnieClient: model=baidu/ernie-4.5-vl-28b-a3b
INFO: Calling baidu/ernie-4.5-vl-28b-a3b...
INFO: ✓ Success (1234 chars)
```
**Time:** ~5-10 seconds per call

### Flaky Network:
```
INFO: Calling baidu/ernie-4.5-vl-28b-a3b...
WARNING: urllib3: Retrying (total=4)...
WARNING: urllib3: Retrying (total=3)...
INFO: ✓ Success (1234 chars)
```
**Time:** 15-30 seconds per call (with retries)

### Severe Issues:
```
INFO: Calling baidu/ernie-4.5-vl-28b-a3b...
WARNING: urllib3: Retrying...
ERROR: Primary timed out (120s)
INFO: Trying fallback: baidu/ernie-4.0-turbo-8k
INFO: ✓ Fallback success (1200 chars)
```
**Time:** Up to 200 seconds (primary timeout + fallback)

### Complete Failure:
```
INFO: Calling baidu/ernie-4.5-vl-28b-a3b...
ERROR: Primary timed out (120s)
INFO: Trying fallback: baidu/ernie-4.0-turbo-8k
ERROR: Both models failed: Connection refused
ERROR: API unavailable
```
**Result:** Analysis fails with clear error message

---

## Performance Estimate

**20-Page Paper Analysis:**

**Best Case (good network):**
- Module 0: 1s
- Module 1: 20s (4 calls × 5s)
- Module 2: 60s (20 sections × 3s, many skipped)
- Module 3: 30s (parallel, 10 claims × 3s)
- Module 4: 30s (parallel)
- Module 5: 30s
- Module 6: 30s
**Total: ~3 minutes**

**Typical Case (retries needed):**
- Each call: 10-15s instead of 5s
**Total: ~5-7 minutes**

**Worst Case (heavy retries):**
- Each call: 20-30s
**Total: ~10-12 minutes**

**Timeout Case (API down):**
- Fails after ~2 minutes per module
**Total: Gives up after 5-10 minutes with error**

---

## What to Monitor

### Backend Terminal:
Watch for these patterns:

**Good:**
```
✓ Success (xxxx chars)
```

**Retrying (normal for flaky networks):**
```
WARNING: urllib3: Retrying
✓ Success
```

**Fallback working:**
```
ERROR: Primary timed out
INFO: Trying fallback
✓ Fallback success
```

**Real problem:**
```
ERROR: Both models failed
```

---

## Restart Required

**To apply these changes:**

1. **Stop backend** (Ctrl+C)
2. **Ensure `.env` does NOT have:**
   ```
   # Remove or comment out:
   # USE_MOCK_CLIENT=1
   ```
3. **Restart:**
   ```bash
   ./launch.bat
   ```

**You should see:**
```
ErnieClient: model=baidu/ernie-4.5-vl-28b-a3b, fallback=baidu/ernie-4.0-turbo-8k
✓ Using Novita AI API
```

---

## When It's Still Slow

**If analysis still takes 15+ minutes:**

1. **Check internet speed:**
   ```powershell
   Test-Connection -Count 5 google.com
   ```

2. **Try different network:**
   - Mobile hotspot
   - Different WiFi
   - Disable VPN

3. **Verify API status:**
   - Visit https://status.novita.ai (if exists)
   - Check Novita dashboard for service status

4. **Alternative: Use local model:**
   - Ollama with llama2/mistral
   - Requires significant code changes

---

## Summary

**Optimizations:**
- ✅ Faster model by default
- ✅ True fallback model  
- ✅ 2-minute timeouts
- ✅ 5 retries with backoff
- ✅ Better error handling
- ✅ Clear logging

**Expected Result:**
- More reliable completion
- Clear visibility of issues
- Automatic recovery from transient failures
- Completes in 3-10 minutes depending on network

**The system will now be much more resilient to network issues while still using the real API.**
