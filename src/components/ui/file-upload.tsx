
import React, { useState, useCallback } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  className?: string;
}

export function FileUpload({ 
  onFilesSelected, 
  maxFiles = 5, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'], 
  maxSize = 10,
  className 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const extension = '.' + file.name.split('.').pop()?.toLowerCase();
      const sizeInMB = file.size / (1024 * 1024);
      return acceptedTypes.includes(extension) && sizeInMB <= maxSize;
    });

    const updatedFiles = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected?.(updatedFiles);
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "glass-card p-8 border-2 border-dashed transition-all duration-300 text-center cursor-pointer",
          dragActive ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600",
          "hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4 animate-scale-in-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Перетащите файлы сюда
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              или нажмите для выбора файлов
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Поддерживаются: {acceptedTypes.join(', ')} (до {maxSize}MB)
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 animate-slide-in-up">
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            Выбранные файлы ({files.length}/{maxFiles})
          </h4>
          {files.map((file, index) => (
            <div key={index} className="glass-card p-3 flex items-center justify-between group hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <X className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={simulateUpload}
            disabled={uploading}
            className="gradient-primary text-white hover:shadow-glow"
          >
            {uploading ? 'Загрузка...' : 'Загрузить файлы'}
          </Button>
        </div>
      )}

      {uploading && (
        <div className="glass-card p-4 animate-scale-in-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Загрузка файлов...</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-gray-500 mt-2">{uploadProgress}% завершено</p>
        </div>
      )}
    </div>
  );
}
