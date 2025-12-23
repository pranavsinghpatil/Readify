
// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const loadingState = document.getElementById('loadingState');
const resultsArea = document.getElementById('resultsArea');
const originalView = document.getElementById('originalView');
const critiqueView = document.getElementById('critiqueView');

// Event Listeners
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        uploadFile(e.dataTransfer.files[0]);
    }
});

function handleFileSelect(e) {
    if (e.target.files.length) {
        uploadFile(e.target.files[0]);
    }
}

async function uploadFile(file) {
    // UI Updates
    dropZone.style.display = 'none';
    loadingState.style.display = 'block';

    // Upload API Call
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Upload Failed");

        const data = await response.json();
        pollStatus(data.job_id);

    } catch (err) {
        alert("Error uploading file: " + err.message);
        loadingState.style.display = 'none';
        dropZone.style.display = 'block';
    }
}

async function pollStatus(jobId) {
    const pollInterval = setInterval(async () => {
        try {
            const res = await fetch(`/status/${jobId}`);
            const data = await res.json();

            // Update Loading Status Text
            document.querySelector('.spinner-text').innerText =
                `Status: ${data.status} (${data.progress}%) - ${data.message}`;

            if (data.status === 'COMPLETED') {
                clearInterval(pollInterval);
                renderReport(data.result); // result contains the pipeline output
            } else if (data.status === 'FAILED') {
                clearInterval(pollInterval);
                alert("Processing Failed: " + data.error);
                loadingState.style.display = 'none';
                dropZone.style.display = 'block';
            }
        } catch (e) {
            console.error("Polling error", e);
        }
    }, 2000);
}

function renderReport(reportData) {
    loadingState.style.display = 'none';
    resultsArea.style.display = 'flex'; // Split view

    // Render Left Side (Original) - Just placeholders for now or text dump
    // In v2, we can render the PDF via PDF.js or the extracted text
    let originalHtml = "<h3>Document Structure</h3>";
    reportData.doc.sections.forEach(sec => {
        originalHtml += `<div class="doc-section">
            <h4>${sec.title} (${sec.section_id})</h4>
            <p>${sec.content.substring(0, 300)}...</p>
        </div>`;
    });
    originalView.innerHTML = originalHtml;

    // Render Right Side (Critique)
    let critiqueHtml = "<h3>SCARF Critique</h3>";

    // 1. Claims & Gaps
    if (reportData.claims && reportData.claims.claims) {
        reportData.claims.claims.forEach(claim => {
            critiqueHtml += `<div class="claim-card">
                <div class="claim-header">
                    <span class="badge-claim">CLAIM</span>
                    ${claim.statement}
                </div>`;

            // Find Gaps for this claim
            const gaps = reportData.gaps?.analysis?.find(g => g.claim_id === claim.claim_id);
            if (gaps && gaps.signals.length > 0) {
                critiqueHtml += `<div class="gap-section">
                    <strong>⚠️ Gaps Detected:</strong>
                    <ul>${gaps.signals.map(s => `<li>${s.signal}</li>`).join('')}</ul>
                </div>`;
            }

            // Find Questions
            const validation = reportData.validation?.report?.find(v => v.claim_id === claim.claim_id);
            if (validation && validation.questions.length > 0) {
                critiqueHtml += `<div class="question-section">
                    <strong>❓ Research Questions:</strong>
                    <ul>${validation.questions.map(q => `<li>${q.question}</li>`).join('')}</ul>
                </div>`;
            }

            critiqueHtml += `</div>`;
        });
    }

    critiqueView.innerHTML = critiqueHtml;
}
