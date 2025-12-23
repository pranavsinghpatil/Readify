import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles, Zap, Shield, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/assets/hero-illustration.png";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
}

const UploadZone = ({ onFileUpload }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        onFileUpload(files[0]);
      }
    },
    [onFileUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileUpload(files[0]);
    }
  };

  const features = [
    { icon: Brain, label: "AI-Powered Analysis", color: "text-primary" },
    { icon: Shield, label: "Gap Detection", color: "text-warning" },
    { icon: Zap, label: "Instant Results", color: "text-success" },
  ];

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Background Illustration */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroIllustration})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-12">
        <div className="mb-10 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary shadow-glow">
            <Sparkles className="h-4 w-4" />
            AI-Powered Scientific Analysis
          </div>
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
            Deconstruct{" "}
            <span className="gradient-text">Scientific Logic</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Upload any research paper and reveal its logical structure. Identify claims, 
            evidence gaps, and generate critical research questions.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm"
            >
              <feature.icon className={cn("h-4 w-4", feature.color)} />
              <span className="text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <div
          className={cn(
            "relative w-full max-w-2xl rounded-2xl border-2 border-dashed p-10 transition-all duration-300",
            "grid-pattern backdrop-blur-sm",
            isDragging
              ? "border-primary bg-primary/10 shadow-glow-strong"
              : "border-border bg-card/30 hover:border-primary/50 hover:bg-card/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isDragging && (
            <div className="pulse-ring border-2 border-primary/50" />
          )}
          
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className={cn(
                "relative rounded-2xl p-6 transition-all duration-300",
                isDragging ? "bg-primary/20 shadow-glow" : "bg-secondary"
              )}
            >
              {isDragging ? (
                <Upload className="h-14 w-14 text-primary animate-bounce" />
              ) : (
                <FileText className="h-14 w-14 text-muted-foreground" />
              )}
            </div>

            <div>
              <p className="mb-2 font-display text-xl font-semibold">
                {isDragging ? "Release to upload" : "Drag & drop your PDF here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click the button below to browse
              </p>
            </div>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 cursor-pointer opacity-0"
            />

            <Button variant="glow" size="lg" className="relative z-10 px-8">
              <Upload className="mr-2 h-5 w-5" />
              Select PDF
            </Button>

            <p className="text-xs text-muted-foreground">
              Supports PDF files up to 50MB
            </p>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <div className="h-3 w-3 rounded-full bg-success" />
            </div>
            <h3 className="font-display font-semibold">Claim Extraction</h3>
            <p className="text-sm text-muted-foreground">Isolate scientific statements</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <div className="h-3 w-3 rounded-full bg-warning" />
            </div>
            <h3 className="font-display font-semibold">Gap Detection</h3>
            <p className="text-sm text-muted-foreground">Find missing evidence</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>
            <h3 className="font-display font-semibold">Evidence Mapping</h3>
            <p className="text-sm text-muted-foreground">Link claims to sources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
