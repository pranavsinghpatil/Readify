
import os
import sys
import asyncio
import json
import fitz # PyMuPDF
from dotenv import load_dotenv

# Load env vars
load_dotenv()

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from backend.reasoning_pipeline.pipeline import SCARFPipeline
from backend.ernie_pipeline.client import ErnieClient
from backend.reasoning_pipeline.schemas import Document

class MockErnie:
    """Mock for local testing without API key"""
    def call(self, prompt, system=None):
        print(f"[MockErnie] Called with prompt length: {len(prompt)}")
        if "Rhetorical" in prompt or "background" in prompt:
            return '{"section_id": "test", "role": "method", "confidence": 0.9}'
        if "Extract primary scientific claims" in prompt:
            return '{"claims": [{"claim_id": "C1", "statement": "Test Claim", "source_section_id": "S1", "confidence": 0.9}]}'
        return '{}'

def run_test():
    print("--- SCARF Pipeline Local Test ---")
    
    # Check for API Key
    if os.getenv("NOVITA_API_KEY"):
        print("Using Real ERNIE Client")
        client = ErnieClient()
    else:
        print("Using Mock Client")
        client = MockErnie()

    pipeline = SCARFPipeline(client)
    
    # Use a real uploaded PDF if available
    real_pdf = r"d:\pro\Readify\uploads\041a1251-6971-411d-8d7e-2fe8e2358476.pdf"
    if os.path.exists(real_pdf):
        pdf_path = real_pdf
        print(f"Testing on Real PDF: {pdf_path}")
    else:
        pdf_path = os.path.join(os.path.dirname(__file__), "dummy.pdf")
        if not os.path.exists(pdf_path):
            doc = fitz.open()
            page = doc.new_page()
            page.insert_text((50, 50), "Method\n\nWe propose SCARF. It uses AI to reason.")
            doc.save(pdf_path)
            doc.close()
            
    try:
        # Step 1: Grounding
        print("\n1. Testing Grounder (Module 0)...")
        # Note: We use the module directly to debug
        doc = pipeline.grounder.run(pdf_path, "test_job_id")
        print(f"   Generated Document with {len(doc.sections)} sections.")
        
        # Step 2: Segmentation
        print("\n2. Testing Segmenter (Module 1)...")
        rhetoric = pipeline.segmenter.run(doc)
        print(f"   Classified {len(rhetoric.roles)} sections.")
        
        # Step 3: Extraction
        print("\n3. Testing Extractor (Module 2)...")
        claims = pipeline.extractor.run(doc, rhetoric)
        print(f"   Extracted {len(claims.claims)} claims.")
        
        print("\n--- Test Passed! ---")
        
    except Exception as e:
        print(f"\n[ERROR] Pipeline Test Failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    run_test()
