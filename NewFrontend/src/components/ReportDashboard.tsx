interface ReportData {
  sections: Array<{
    id: string;
    title: string;
    page: number;
    type: string;
  }>;
  claims: Array<{
    id: string;
    statement: string;
    confidence: "high" | "medium" | "low";
    evidence: Array<{ id: string; text: string; source: string; page: number }>;
    gaps: Array<{ type: string; message: string }>;
    questions: Array<{ id: string; text: string }>;
  }>;
}

interface ReportDashboardProps {
  data: ReportData;
  fileName: string;
  isPartial?: boolean;
}

const ReportDashboard = ({ data, fileName }: ReportDashboardProps) => {
  const totalEvidence = data.claims.reduce((sum, c) => sum + c.evidence.length, 0);
  const totalGaps = data.claims.reduce((sum, c) => sum + c.gaps.length, 0);
  const totalQuestions = data.claims.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto space-y-8 font-mono text-sm">
        
        {/* Header */}
        <div className="border-b-2 border-black pb-4">
          <h1 className="text-2xl font-bold mb-2">SCARF ANALYSIS REPORT</h1>
          <p>Document: {fileName}</p>
          <p>Generated: {new Date().toLocaleString()}</p>
        </div>

        {/* Summary */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-lg font-bold mb-2">SUMMARY</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-1">Claims Extracted:</td>
                <td className="text-right font-bold">{data.claims.length}</td>
              </tr>
              <tr>
                <td className="py-1">Evidence Links:</td>
                <td className="text-right font-bold">{totalEvidence}</td>
              </tr>
              <tr>
                <td className="py-1">Gaps Identified:</td>
                <td className="text-right font-bold">{totalGaps}</td>
              </tr>
              <tr>
                <td className="py-1">Validation Questions:</td>
                <td className="text-right font-bold">{totalQuestions}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Document Structure */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-lg font-bold mb-2">DOCUMENT STRUCTURE</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-1">Section</th>
                <th className="text-right py-1">Page</th>
              </tr>
            </thead>
            <tbody>
              {data.sections.map((sec) => (
                <tr key={sec.id}>
                  <td className="py-1">{sec.title}</td>
                  <td className="text-right py-1">{sec.page}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Claims */}
        <div>
          <h2 className="text-lg font-bold mb-4">CLAIMS ANALYSIS</h2>
          
          {data.claims.length === 0 ? (
            <p className="text-gray-500">No claims were extracted from this document.</p>
          ) : (
            data.claims.map((claim, idx) => (
              <div key={claim.id} className="mb-8 pb-8 border-b border-gray-300 last:border-0">
                
                {/* Claim Header */}
                <div className="mb-3">
                  <p className="font-bold">
                    CLAIM #{idx + 1} ({claim.confidence.toUpperCase()} CONFIDENCE)
                  </p>
                  <p className="mt-2 pl-4 border-l-4 border-black py-1">
                    {claim.statement}
                  </p>
                </div>

                {/* Evidence */}
                <div className="mb-3">
                  <p className="font-bold">EVIDENCE ({claim.evidence.length})</p>
                  {claim.evidence.length === 0 ? (
                    <p className="text-gray-500 ml-4">No evidence found</p>
                  ) : (
                    <div className="ml-4 space-y-2">
                      {claim.evidence.map((ev, eIdx) => (
                        <div key={ev.id}>
                          <p>[{eIdx + 1}] {ev.text}</p>
                          <p className="text-gray-600 text-xs ml-4">Source: {ev.source}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gaps */}
                {claim.gaps.length > 0 && (
                  <div className="mb-3">
                    <p className="font-bold">GAPS IDENTIFIED ({claim.gaps.length})</p>
                    <div className="ml-4 space-y-1">
                      {claim.gaps.map((gap, gIdx) => (
                        <p key={gIdx}>• {gap.message}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation Questions */}
                {claim.questions.length > 0 && (
                  <div>
                    <p className="font-bold">VALIDATION QUESTIONS ({claim.questions.length})</p>
                    <div className="ml-4 space-y-1">
                      {claim.questions.map((q, qIdx) => (
                        <p key={q.id}>{qIdx + 1}. {q.text}</p>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black pt-4 text-center text-xs text-gray-500">
          <p>Generated by SCARF - Scientific Claim Analysis & Reasoning Framework</p>
        </div>

      </div>
    </div>
  );
};

export default ReportDashboard;
