import React, { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { uploadDocument } from '../lib/api';
import { cn } from '../lib/utils';

interface FileUploadProps {
  onUploadComplete: (filename: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processUpload(e.target.files[0]);
    }
  };

  const processUpload = async (file: File) => {
    setStatus('uploading');
    setErrorMessage('');
    
    try {
      const result = await uploadDocument(file);
      setStatus('success');
      onUploadComplete(result.filename);
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.response?.data?.detail || "Upload failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div 
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out cursor-pointer",
          isDragging ? "border-blue-500 bg-blue-50/10 scale-105" : "border-gray-600 hover:border-gray-400 bg-gray-800/50",
          status === 'success' ? "border-green-500 bg-green-500/10" : "",
          status === 'error' ? "border-red-500 bg-red-500/10" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept=".pdf,.docx,.txt,.md"
        />
        
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {status === 'idle' && (
            <>
              <div className="p-4 rounded-full bg-gray-700/50">
                <Upload className="w-8 h-8 text-gray-300" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-200">Drop your document here</p>
                <p className="text-sm text-gray-400">PDF, DOCX, TXT, MD</p>
              </div>
            </>
          )}

          {status === 'uploading' && (
            <>
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
              <p className="text-blue-400 font-medium">Processing Document...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-10 h-10 text-green-400" />
              <p className="text-green-400 font-medium">Ready to Chat!</p>
              <p className="text-xs text-gray-400">Click to upload another</p>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-red-400 font-medium">Upload Failed</p>
              <p className="text-xs text-red-300">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
