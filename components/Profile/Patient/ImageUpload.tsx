"use client";
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { handleFileUpload } from "../../../app/actions"; // ensure path is correct

interface ImageUploadProps {
  value?: string;
  onChange: (image_url: string) => void;
  error?: string;
  className?: string;
  user_id: string;
  patient_name: string;
  role: 'doctor' | 'patient';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  error,
  className = '',
  user_id,
  patient_name,
  role
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const uploadedUrl = await handleFileUpload(file, user_id, patient_name, role);
    if (uploadedUrl) {
      setPreview(uploadedUrl);
      onChange(uploadedUrl);
      console.log("image Url :",uploadedUrl)
    } else {
      alert('Image upload failed');
    }
    setUploading(false);
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      uploadImage(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <div className="relative w-full max-w-sm mx-auto">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 rounded-full p-1 h-8 w-8"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              className="text-sm"
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Change Image"}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragOver
              ? 'border-[#bd1818] bg-red-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-[#bd1818] hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 text-gray-400">
              <Image className="w-full h-full" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-2"
              style={{ borderColor: '#bd1818', color: '#bd1818' }}
              disabled={uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default ImageUpload;
