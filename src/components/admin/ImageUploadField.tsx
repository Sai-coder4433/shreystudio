import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon, Cloud, AlertCircle } from 'lucide-react';
import { uploadImageToCloud } from '../../firebase/storageService';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  aspectRatioHint?: string;
  folder?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  aspectRatioHint = 'Recommended: 1200x800 or 3:2 portrait/landscape',
  folder = 'hero_photos',
}) => {
  const [inputMode, setInputMode] = useState<'url' | 'file'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      setUploadProgress(1);

      // Upload directly to Firebase Cloud Storage with progress updates
      const downloadUrl = await uploadImageToCloud(file, folder, (percent) => {
        setUploadProgress(percent);
      });

      onChange(downloadUrl);
    } catch (err: any) {
      console.error('Failed to upload image to Firebase Storage:', err);
      setErrorMessage(err?.message || 'Upload failed. Please check your internet connection and try again.');
    } finally {
      setIsProcessing(false);
      setUploadProgress(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset file input so selecting the same file triggers change
    if (e.target) e.target.value = '';
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setErrorMessage(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {/* Label + Mode Toggle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <label className="block text-xs font-bold font-['Plus_Jakarta_Sans'] tracking-wider uppercase text-stone-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="inline-flex rounded-lg bg-stone-100 p-0.5 border border-stone-200">
          <button
            type="button"
            onClick={() => setInputMode('file')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              inputMode === 'file'
                ? 'bg-white text-stone-900 font-bold shadow-xs border border-stone-200'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Upload className="w-3 h-3" />
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              inputMode === 'url'
                ? 'bg-white text-stone-900 font-bold shadow-xs border border-stone-200'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            Image URL
          </button>
        </div>
      </div>

      {/* Upload Zone or URL Input */}
      {inputMode === 'file' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isProcessing
              ? 'border-amber-400 bg-amber-50/50 cursor-wait'
              : isDragging
              ? 'border-amber-500 bg-amber-50'
              : 'border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={isProcessing}
            onChange={handleFileInputChange}
          />
          {isProcessing ? (
            <div className="flex flex-col items-center py-2 space-y-2">
              <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <div>
                <p className="text-xs font-bold text-stone-800">
                  Uploading to Firebase Cloud Storage…
                </p>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                  {uploadProgress !== null ? `${uploadProgress}% uploaded` : 'Optimizing resolution…'}
                </p>
              </div>
              {uploadProgress !== null && (
                <div className="w-48 bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-amber-600 h-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-500">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-700">
                  Click to browse from computer or drag & drop
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">{aspectRatioHint}</p>
                <p className="text-[10px] text-emerald-600 font-medium mt-1">
                  ✓ Uploads directly to Firebase Storage CDN
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Paste image URL: https://images.unsplash.com/…"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyUrl(); } }}
            className="flex-1 bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Apply
          </button>
        </div>
      )}

      {/* Error message if upload failed */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Preview */}
      {value ? (
        <div className="mt-2 rounded-xl overflow-hidden border border-stone-200 bg-white p-2.5 flex items-center gap-3">
          <div className="w-20 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=300';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Image Ready</span>
              {value.includes('firebasestorage.googleapis.com') && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <Cloud className="w-2.5 h-2.5" />
                  Firebase Storage
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400 truncate mt-0.5" title={value}>
              {value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            title="Remove image"
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-stone-400 flex items-center gap-1">
          <ImageIcon className="w-3 h-3" />
          No image selected
        </p>
      )}
    </div>
  );
};
