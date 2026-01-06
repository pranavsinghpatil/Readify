import requests
import os

BASE_URL = "http://localhost:8000/api"
PDF_PATH = r"c:\GitRepo\Readify\AI_Intern_Assignment_Document_QA_Assistant.pdf"

def test_health():
    try:
        r = requests.get("http://localhost:8000/")
        print(f"Server Status: {r.status_code} - {r.json()['message']}")
        return True
    except Exception as e:
        print(f"Server is down: {e}")
        return False

def test_upload():
    if not os.path.exists(PDF_PATH):
        print(f"Error: PDF not found at {PDF_PATH}")
        return False
        
    print(f"\nUploading {PDF_PATH}...")
    with open(PDF_PATH, "rb") as f:
        files = {"file": f}
        r = requests.post(f"{BASE_URL}/upload", files=files)
        
    if r.status_code == 200:
        print("✅ Upload Success:", r.json())
        return True
    else:
        print("❌ Upload Failed:", r.text)
        return False

def test_query(question):
    print(f"\nAsking: '{question}'")
    r = requests.post(f"{BASE_URL}/query", json={"question": question})
    
    if r.status_code == 200:
        data = r.json()
        print(f"✅ Answer: {data['answer']}")
        print(f"   Citations: {data['citations']}")
    else:
        print("❌ Query Failed:", r.text)

if __name__ == "__main__":
    if test_health():
        if test_upload():
            test_query("What is the main goal of this assignment?")
            test_query("What are the functional requirements?")
            test_query("What is the tech stack?")
