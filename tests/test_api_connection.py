
import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

def test_chat_completion():
    api_key = os.getenv("NOVITA_API_KEY")
    if not api_key:
        print("❌ ERROR: NOVITA_API_KEY missing.")
        return

    # Try the Chat Endpoint directly
    # Adjust Base URL if needed. Common Novita endpoint: https://api.novita.ai/v3/openai
    # But earlier docs said v1. Let's try the one in client.py
    base_url = os.getenv("NOVITA_BASE_URL", "https://api.novita.ai/v3/openai") 
    
    url = f"{base_url}/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "ernie-4.0-turbo-8k", # Try a standard model name if 4.5 is specific
        "messages": [{"role": "user", "content": "Hello, are you online?"}],
        "max_tokens": 10
    }
    
    print(f"Testing URL: {url}")
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=15)
        if response.status_code == 200:
             print("✅ CHAT COMPLETION SUCCESS!")
             print(f"   Response: {response.json()['choices'][0]['message']['content']}")
        else:
             print(f"❌ API ERROR: {response.status_code}")
             print(f"   Body: {response.text}")
             print("   Hint: Check NOVITA_BASE_URL in .env or model name.")
    except Exception as e:
        print(f"❌ NETWORK ERROR: {e}")

if __name__ == "__main__":
    test_chat_completion()
