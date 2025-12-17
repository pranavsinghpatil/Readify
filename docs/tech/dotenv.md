# Dotenv: Configuration Management

**The Rule**: Config in code is bad. Config in environment variables is good.
We use `python-dotenv` to load configuration from a `.env` file during development.

## 🔒 Security First

The `.env` file contains **secrets** (API Keys, Tokens).
*   **NEVER** commit `.env` to Git.
*   **ALWAYS** add `.env` to `.gitignore`.
*   **ALWAYS** provide a `.env.example` with dummy values.

## 🛠 Usage

```python
# In main.py
from dotenv import load_dotenv
import os

# Load variables from .env file into os.environ
load_dotenv()

# Access them
API_KEY = os.getenv("NOVITA_API_KEY")

if not API_KEY:
    raise ValueError("NOVITA_API_KEY is missing! Check your .env file.")
```

## 🏗 Configuration Class Pattern

Instead of scattering `os.getenv` everywhere, we centralize it in `config.py` using Pydantic's `BaseSettings`.

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    novita_api_key: str
    github_token: str
    debug_mode: bool = False
    
    class Config:
        env_file = ".env"

# Usage
settings = Settings()
print(settings.novita_api_key)
```

**Why Pydantic Settings?**
1.  **Type Safety**: It converts "true" string to `True` boolean automatically.
2.  **Validation**: It crashes at startup if a required key is missing, rather than crashing 2 hours later when that key is needed.
