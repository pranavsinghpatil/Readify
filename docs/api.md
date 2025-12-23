# SCARF API Documentation

Base URL: `http://127.0.0.1:8000`

## Endpoints

### 1. Upload Document
Initiates the asynchronous analysis pipeline.

*   **POST** `/upload`
*   **Body**: `multipart/form-data`
    *   `file`: PDF File
*   **Response**:
    ```json
    {
      "job_id": "uuid-string",
      "message": "Upload successful. Processing started."
    }
    ```

### 2. Check Status
Poll this endpoint to track progress.

*   **GET** `/status/{job_id}`
*   **Response**:
    ```json
    {
      "status": "PROCESSING", // PENDING, PROCESSING_OCR, COMPLETED, FAILED
      "progress": 45,         // Integer 0-100
      "message": "Running Gap Analysis..."
    }
    ```

### 3. Get Report
Retrieves the final structured analysis.

*   **GET** `/report/{job_id}`
*   **Response** (JSON Schema):
    *   `doc`: Document Structure
    *   `claims`: List of Claims
    *   `evidence`: Linked Evidence
    *   `gaps`: Identified Gaps
    *   `validation`: Research Questions

## Error Handling
The API returns standard HTTP codes.
*   `404`: Job or Resource not found.
*   `500`: Internal Pipeline Error (Check backend logs).

## Development Notes
*   **CORS**: Enabled for `localhost` (any port).
*   **Timeout**: LLM steps can take 30-60s per section.
