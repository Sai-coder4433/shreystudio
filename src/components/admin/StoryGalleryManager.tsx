import React, { useState, useRef } from 'react';
import {
  Upload,
  Link as LinkIcon,
  X,
  Check,
  Image as ImageIcon,
  Cloud,
  AlertCircle,
  RefreshCw,
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Plus,
} from 'lucide-react';
import { uploadImageToCloud } from '../../firebase/storageService';

interface StoryGalleryManagerProps {
  gallery: string[];
  onChangeGallery: (newGallery: string[]) => void;
  coverImage: string;
  onSetCoverImage: (newCover: string) => void;
  folder?: string;
}

export const StoryGalleryManager: React.FC<StoryGalleryManagerProps> = ({
  gallery,
  onChangeGallery,
  coverImage,
  onSetCoverImage,
  folder = 'stories',
}) => {
  // Add mode state
  const [addMode, setAddMode] = useState<'files' | 'url'>('files');
  const [newUrlInput, setNewUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
    percent: number;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Replace photo modal / popover state
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [replaceMode, setReplaceMode] = useState<'file' | 'url'>('file');
  const [replaceUrlInput, setReplaceUrlInput] = useState('');
  const [isReplacingUpload, setIsReplacingUpload] = useState(false);
  const [replaceProgress, setReplaceProgress] = useState<number | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  // Full-size Preview Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // Multi-file Upload for Adding Photos
  // ─────────────────────────────────────────────────────────────────────────────
  const handleAddFiles = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      alert('Please select valid image files (JPEG, PNG, WEBP).');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      const total = validFiles.length;
      const uploadedUrls: string[] = [];

      for (let i = 0; i < total; i++) {
        setUploadProgress({
          current: i + 1,
          total,
          percent: Math.round(((i) / total) * 100),
        });

        const file = validFiles[i];
        const url = await uploadImageToCloud(file, folder, (singlePercent) => {
          const overall = Math.round(((i + singlePercent / 100) / total) * 100);
          setUploadProgress({
            current: i + 1,
            total,
            percent: overall,
          });
        });

        uploadedUrls.push(url);
      }

      const updatedGallery = [...gallery, ...uploadedUrls];
      onChangeGallery(updatedGallery);

      // If no cover image yet, set the first uploaded one
      if (!coverImage && uploadedUrls.length > 0) {
        onSetCoverImage(uploadedUrls[0]);
      }
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      setUploadError(err?.message || 'Failed to upload images. Please check your connection.');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleAddUrl = () => {
    const trimmed = newUrlInput.trim();
    if (trimmed) {
      const updatedGallery = [...gallery, trimmed];
      onChangeGallery(updatedGallery);
      if (!coverImage) {
        onSetCoverImage(trimmed);
      }
      setNewUrlInput('');
      setUploadError(null);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Replace an Existing Uploaded Photo
  // ─────────────────────────────────────────────────────────────────────────────
  const openReplaceModal = (index: number) => {
    setReplacingIndex(index);
    setReplaceMode('file');
    setReplaceUrlInput(gallery[index] || '');
    setReplaceError(null);
  };

  const closeReplaceModal = () => {
    setReplacingIndex(null);
    setReplaceUrlInput('');
    setReplaceError(null);
    setIsReplacingUpload(false);
  };

  const handleExecuteReplaceFile = async (file: File) => {
    if (replacingIndex === null) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    try {
      setIsReplacingUpload(true);
      setReplaceError(null);
      setReplaceProgress(1);

      const downloadUrl = await uploadImageToCloud(file, folder, (pct) => {
        setReplaceProgress(pct);
      });

      const oldUrl = gallery[replacingIndex];
      const updatedGallery = [...gallery];
      updatedGallery[replacingIndex] = downloadUrl;
      onChangeGallery(updatedGallery);

      // If this photo was also the story's cover image, update cover image too!
      if (coverImage === oldUrl) {
        onSetCoverImage(downloadUrl);
      }

      closeReplaceModal();
    } catch (err: any) {
      console.error('Failed to replace image:', err);
      setReplaceError(err?.message || 'Failed to upload replacement. Please try again.');
    } finally {
      setIsReplacingUpload(false);
      setReplaceProgress(null);
    }
  };

  const handleExecuteReplaceUrl = () => {
    if (replacingIndex === null) return;
    const trimmed = replaceUrlInput.trim();
    if (!trimmed) {
      alert('Please enter a valid image URL.');
      return;
    }

    const oldUrl = gallery[replacingIndex];
    const updatedGallery = [...gallery];
    updatedGallery[replacingIndex] = trimmed;
    onChangeGallery(updatedGallery);

    if (coverImage === oldUrl) {
      onSetCoverImage(trimmed);
    }

    closeReplaceModal();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Delete a Photo
  // ─────────────────────────────────────────────────────────────────────────────
  const handleDeletePhoto = (index: number) => {
    const photoToDelete = gallery[index];
    const updatedGallery = gallery.filter((_, i) => i !== index);
    onChangeGallery(updatedGallery);

    // If deleting the current cover image, assign the first available remaining image
    if (coverImage === photoToDelete) {
      if (updatedGallery.length > 0) {
        onSetCoverImage(updatedGallery[0]);
      } else {
        onSetCoverImage('');
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Reorder Photos
  // ─────────────────────────────────────────────────────────────────────────────
  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;

    const updated = [...gallery];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChangeGallery(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider text-stone-700">
              Gallery Photos Below Cover Image
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              {gallery.length} {gallery.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Shown on the story detail page, archival plate collection & full-screen lightbox.
          </p>
        </div>

        {gallery.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all gallery photos?')) {
                onChangeGallery([]);
              }
            }}
            className="text-[11px] text-stone-400 hover:text-red-600 transition-colors cursor-pointer self-start sm:self-center font-medium"
          >
            Clear all gallery photos
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          Add New Photos Section (Drag & Drop + Multi-file or URL)
         ───────────────────────────────────────────────────────────────────── */}
      <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Upload More Photos to Story
          </span>
          <div className="inline-flex rounded-lg bg-stone-200/70 p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setAddMode('files')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                addMode === 'files'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Upload className="w-3 h-3" />
              Upload Files (Multi)
            </button>
            <button
              type="button"
              onClick={() => setAddMode('url')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                addMode === 'url'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              Paste URL
            </button>
          </div>
        </div>

        {addMode === 'files' ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.length) {
                handleAddFiles(e.dataTransfer.files);
              }
            }}
            onClick={() => !isUploading && multiFileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isUploading
                ? 'border-amber-400 bg-amber-50/50 cursor-wait'
                : isDragging
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-300 bg-white hover:border-amber-400 hover:bg-stone-50/50'
            }`}
          >
            <input
              ref={multiFileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              disabled={isUploading}
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleAddFiles(e.target.files);
                  e.target.value = '';
                }
              }}
            />

            {isUploading && uploadProgress ? (
              <div className="py-2 space-y-2">
                <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold text-stone-800">
                  Uploading {uploadProgress.current} of {uploadProgress.total} photos to Cloud Storage…
                </p>
                <div className="w-56 bg-stone-200 h-2 rounded-full overflow-hidden mx-auto">
                  <div
                    className="bg-amber-600 h-full transition-all duration-200"
                    style={{ width: `${uploadProgress.percent}%` }}
                  />
                </div>
                <p className="text-[10px] text-stone-500 font-mono">
                  {uploadProgress.percent}% completed
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 py-1">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-700">
                    Click to select multiple photos or drag & drop here
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5">
                    JPEG, PNG, WEBP • Automatically compressed & uploaded to Firebase CDN
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
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              className="flex-1 bg-white border border-stone-200 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        )}

        {uploadError && (
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          List of Already Uploaded Photos (Edit, Replace, Delete, Reorder, Set Cover)
         ───────────────────────────────────────────────────────────────────── */}
      {gallery.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
            <span>
              Manage each photo: <strong className="text-stone-700">Replace</strong>, <strong className="text-stone-700">Delete</strong>, <strong className="text-stone-700">Set as Cover</strong>, or <strong className="text-stone-700">Reorder</strong>.
            </span>
            <span className="font-mono text-[10px] text-stone-400">Total: {gallery.length}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {gallery.map((imgUrl, idx) => {
              const isCover = imgUrl === coverImage;

              return (
                <div
                  key={`${imgUrl}-${idx}`}
                  className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-200 shadow-xs flex flex-col ${
                    isCover
                      ? 'border-amber-400 ring-2 ring-amber-300/60 shadow-amber-500/10'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {/* Photo Thumbnail */}
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400';
                      }}
                    />

                    {/* Gradient top overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Index Badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-[10px] font-bold text-white font-mono shadow-xs">
                      #{idx + 1}
                    </span>

                    {/* Cover Star Badge if Cover */}
                    {isCover && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-stone-950" />
                        <span>Cover</span>
                      </span>
                    )}

                    {/* Zoom / Lightbox Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      title="Inspect full resolution"
                      className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-colors cursor-pointer shadow-sm"
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Action Toolbar Below Image */}
                  <div className="p-2.5 bg-stone-50 border-t border-stone-100 space-y-2 flex-1 flex flex-col justify-between">
                    {/* Primary actions: Replace & Delete */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => openReplaceModal(idx)}
                        className="w-full py-1.5 px-2 bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-800 text-[11px] font-bold rounded-lg border border-stone-200 hover:border-amber-300 flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        title="Replace this photo with a new file or URL"
                      >
                        <RefreshCw className="w-3 h-3 text-amber-600" />
                        <span>Replace</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(idx)}
                        className="w-full py-1.5 px-2 bg-white hover:bg-red-50 text-stone-600 hover:text-red-600 text-[11px] font-bold rounded-lg border border-stone-200 hover:border-red-200 flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                        title="Delete this photo from story"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Secondary Row: Set as Cover + Reorder */}
                    <div className="flex items-center justify-between gap-1 pt-0.5">
                      {/* Set as Cover button */}
                      {!isCover ? (
                        <button
                          type="button"
                          onClick={() => onSetCoverImage(imgUrl)}
                          className="px-2 py-1 text-[10px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md flex items-center gap-1 transition-colors cursor-pointer"
                          title="Set this photo as the story cover"
                        >
                          <Star className="w-2.5 h-2.5 text-amber-600" />
                          <span>Set as Cover</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 px-1">
                          <Check className="w-3 h-3 text-amber-600" />
                          <span>Active Cover</span>
                        </span>
                      )}

                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMove(idx, 'left')}
                          className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-200/80 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Move Left / Earlier"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === gallery.length - 1}
                          onClick={() => handleMove(idx, 'right')}
                          className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-200/80 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Move Right / Later"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-300">
          <ImageIcon className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-stone-600">No gallery photos added yet</p>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Upload wedding photos above to build this story’s rich archival gallery.
          </p>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          REPLACE PHOTO MODAL
         ───────────────────────────────────────────────────────────────────── */}
      {replacingIndex !== null && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          data-lenis-prevent="true"
        >
          <div className="bg-white border border-stone-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Replace Photo #{replacingIndex + 1}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Select a new image to replace the current photo in place
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeReplaceModal}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current photo preview */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-stone-200 shrink-0 border border-stone-300">
                <img
                  src={gallery[replacingIndex]}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Current Image
                </span>
                <p className="text-[11px] text-stone-700 font-mono truncate" title={gallery[replacingIndex]}>
                  {gallery[replacingIndex]}
                </p>
                {gallery[replacingIndex] === coverImage && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700">
                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    Also Cover Image (will update too)
                  </span>
                )}
              </div>
            </div>

            {/* Mode switch */}
            <div className="inline-flex rounded-lg bg-stone-100 p-0.5 w-full text-xs">
              <button
                type="button"
                onClick={() => setReplaceMode('file')}
                className={`flex-1 py-1.5 font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  replaceMode === 'file'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Upload New File
              </button>
              <button
                type="button"
                onClick={() => setReplaceMode('url')}
                className={`flex-1 py-1.5 font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  replaceMode === 'url'
                    ? 'bg-white text-stone-900 font-bold shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Image URL
              </button>
            </div>

            {/* Replace execution */}
            {replaceMode === 'file' ? (
              <div
                onClick={() => !isReplacingUpload && replaceFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                  isReplacingUpload
                    ? 'border-amber-400 bg-amber-50/50 cursor-wait'
                    : 'border-stone-300 hover:border-amber-400 bg-stone-50 hover:bg-white'
                }`}
              >
                <input
                  ref={replaceFileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={isReplacingUpload}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleExecuteReplaceFile(file);
                      e.target.value = '';
                    }
                  }}
                />

                {isReplacingUpload ? (
                  <div className="py-2 space-y-2">
                    <div className="w-6 h-6 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs font-bold text-stone-800">
                      Uploading replacement to Cloud Storage…
                    </p>
                    {replaceProgress !== null && (
                      <div className="w-48 bg-stone-200 h-1.5 rounded-full overflow-hidden mx-auto mt-1">
                        <div
                          className="bg-amber-600 h-full transition-all duration-200"
                          style={{ width: `${replaceProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5">
                    <Upload className="w-5 h-5 text-stone-400" />
                    <p className="text-xs font-semibold text-stone-700">
                      Choose new replacement image from device
                    </p>
                    <p className="text-[10px] text-stone-400">
                      JPEG, PNG, WEBP • Uploads directly to Cloud
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/…"
                  value={replaceUrlInput}
                  onChange={(e) => setReplaceUrlInput(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleExecuteReplaceUrl}
                  className="w-full py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm URL Replacement</span>
                </button>
              </div>
            )}

            {replaceError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{replaceError}</span>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={closeReplaceModal}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────
          FULL-SCREEN LIGHTBOX PREVIEW
         ───────────────────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
          data-lenis-prevent="true"
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Controls */}
            <div className="w-full flex items-center justify-between text-white pb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs bg-white/20 px-2.5 py-1 rounded-md">
                  Photo #{lightboxIndex + 1} of {gallery.length}
                </span>
                {gallery[lightboxIndex] === coverImage && (
                  <span className="text-xs bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-stone-950" />
                    Cover Photo
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 max-h-[75vh] flex items-center justify-center">
              <img
                src={gallery[lightboxIndex]}
                alt=""
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                disabled={lightboxIndex === 0}
                onClick={() => setLightboxIndex(lightboxIndex - 1)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                type="button"
                disabled={lightboxIndex === gallery.length - 1}
                onClick={() => setLightboxIndex(lightboxIndex + 1)}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
