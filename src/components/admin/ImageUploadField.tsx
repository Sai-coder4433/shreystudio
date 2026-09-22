import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X, Check, Image as ImageIcon } from 'lucide-react';
import { compressImageFile } from '../../context/StudioDataContext';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  aspectRatioHint?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  aspectRatioHint = 'Recommended: 1200x800 or 3:2 portrait/landscape',
}) => {
  const [inputMode, setInputMode] = useState<'url' | 'file'>('file');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    try {
      setIsProcessing(true);
      const compressedDataUrl = await compressImageFile(file, 1400, 0.82);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Failed to compress image:', err);
      alert('Could not process image file. Please try another image.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
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
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
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
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
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
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-amber-500 bg-amber-50'
              : 'border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
          {isProcessing ? (
            <div className="flex flex-col items-center py-2">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
              <p className="text-xs text-stone-500 font-medium">Compressing & optimizing…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-500">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-700">
                  Click to browse or drag & drop
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">{aspectRatioHint}</p>
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
            </div>
            <p className="text-[11px] text-stone-400 truncate mt-0.5">
              {value.startsWith('data:') ? '📁 Local file (compressed)' : value}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            title="Remove image"
            className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
