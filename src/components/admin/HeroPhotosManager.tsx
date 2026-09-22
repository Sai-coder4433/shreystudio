import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Sparkles,
  X,
  Check,
  Search,
  RotateCcw,
  Camera,
  AlertTriangle,
  Cloud,
} from 'lucide-react';
import { useStudioData } from '../../context/StudioDataContext';
import { PhotoItem } from '../../types';
import { ImageUploadField } from './ImageUploadField';

const POPULAR_CATEGORIES = [
  'Royal Heritage',
  'Fine Art Portrait',
  'High Fashion',
  'Architecture',
  'Museum Space',
  'Cinematic Wedding',
  'Monochrome',
  'Contemporary Structure',
];

export const HeroPhotosManager: React.FC = () => {
  const {
    heroPhotos,
    addHeroPhoto,
    updateHeroPhoto,
    deleteHeroPhoto,
    resetHeroPhotos,
    isCloudConnected,
    isSyncing,
  } = useStudioData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);

  // In-app Delete Confirmation Modal State
  const [photoToDelete, setPhotoToDelete] = useState<PhotoItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState(POPULAR_CATEGORIES[0]);
  const [formYear, setFormYear] = useState(new Date().getFullYear().toString());
  const [formUrl, setFormUrl] = useState('');

  const openAddModal = () => {
    setFormTitle('');
    setFormCategory(POPULAR_CATEGORIES[0]);
    setFormYear(new Date().getFullYear().toString());
    setFormUrl('');
    setEditingPhoto(null);
    setIsModalOpen(true);
  };

  const openEditModal = (photo: PhotoItem) => {
    setFormTitle(photo.title);
    setFormCategory(photo.category);
    setFormYear(photo.year);
    setFormUrl(photo.url);
    setEditingPhoto(photo);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a photo title.');
      return;
    }
    if (!formUrl.trim()) {
      alert('Please provide or upload an image.');
      return;
    }

    if (editingPhoto) {
      updateHeroPhoto(editingPhoto.id, {
        title: formTitle.trim(),
        category: formCategory.trim(),
        year: formYear.trim() || '2026',
        url: formUrl.trim(),
      });
      showToast(`✓ "${formTitle.trim()}" updated & synced to Cloud!`);
    } else {
      addHeroPhoto({
        title: formTitle.trim(),
        category: formCategory.trim(),
        year: formYear.trim() || '2026',
        url: formUrl.trim(),
      });
      showToast(`✓ "${formTitle.trim()}" added to 3D cylinder & Cloud!`);
    }
    setIsModalOpen(false);
  };

  const confirmDeletePhoto = () => {
    if (photoToDelete) {
      deleteHeroPhoto(photoToDelete.id);
      showToast(`✓ Photo "${photoToDelete.title}" deleted.`);
      setPhotoToDelete(null);
    }
  };

  const confirmResetAll = () => {
    resetHeroPhotos();
    showToast('✓ Hero Photos reset to original presets.');
    setIsResetConfirmOpen(false);
  };

  const filtered = heroPhotos.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.year.includes(q)
    );
  });

  return (
    <div className="space-y-6" data-lenis-prevent="true">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Camera className="w-4 h-4 text-amber-600" />
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
              Hero 3D Cylinder Photos
            </h3>
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
              {heroPhotos.length} Photos
            </span>
            {isCloudConnected && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                <Cloud className="w-3 h-3 text-emerald-600" />
                <span>Cloud Synced</span>
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500">
            These photos rotate in real-time inside the 3D cylinder belt in the hero section. Any change syncs directly to Firebase Cloud.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-xl border border-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Search by title, category, year…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-500 shadow-xs"
        />
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((photo, idx) => (
          <div
            key={photo.id}
            className="group relative bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col shadow-xs"
          >
            {/* Image Preview */}
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Index badge */}
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[10px] font-bold text-amber-400 font-mono backdrop-blur-sm">
                #{idx + 1}
              </span>

              {/* Title overlay */}
              <div className="absolute bottom-2.5 inset-x-2.5">
                <p className="font-['Cormorant_Garamond'] text-base font-bold text-white leading-tight truncate">
                  {photo.title}
                </p>
                <p className="text-[10px] text-amber-300/90 font-mono mt-0.5">{photo.year}</p>
              </div>
            </div>

            {/* Card Footer with ALWAYS-VISIBLE Edit & Delete Buttons */}
            <div className="p-3 bg-white flex flex-col gap-2 border-t border-stone-100">
              <span className="text-[11px] font-medium text-stone-500 truncate">
                {photo.category}
              </span>

              <div className="flex items-center gap-1.5 pt-1 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => openEditModal(photo)}
                  className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 text-stone-700 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Edit photo details"
                >
                  <Edit3 className="w-3 h-3 text-amber-600" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPhotoToDelete(photo)}
                  className="py-1.5 px-2 bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-600 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Delete photo"
                >
                  <Trash2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl">
          <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-stone-600">No Hero Photos Found</h4>
          <p className="text-xs text-stone-400 mt-1">
            {searchQuery ? 'Try clearing your search term.' : 'Add your first photo to the 3D cylinder.'}
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-4 px-4 py-2 bg-stone-950 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Add New Hero Photo
          </button>
        </div>
      )}

      {/* ── Edit / Add Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div
            className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl my-auto"
            data-lenis-prevent="true"
          >
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-stone-100 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
                  {editingPhoto ? 'Edit Hero Photo' : 'Add Hero Photo'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Photo Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royal Heritage Courtyard"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Category + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    list="hero-cat-suggestions"
                    placeholder="e.g. Royal Heritage"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                  <datalist id="hero-cat-suggestions">
                    {POPULAR_CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Image Field */}
              <ImageUploadField
                label="Hero Image"
                value={formUrl}
                onChange={setFormUrl}
                required
                aspectRatioHint="Portrait 3:4 recommended for 3D rotating cylinder"
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingPhoto ? 'Save Changes' : 'Add Photo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── In-App Delete Confirmation Modal ── */}
      {photoToDelete && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          data-lenis-prevent="true"
        >
          <div className="bg-white border border-stone-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
                Delete Photo?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to remove <span className="font-bold text-stone-800">"{photoToDelete.title}"</span>? This will remove it from the 3D cylinder and Firebase Cloud.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setPhotoToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletePhoto}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── In-App Reset Confirmation Modal ── */}
      {isResetConfirmOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          data-lenis-prevent="true"
        >
          <div className="bg-white border border-stone-200 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
                Reset Hero Photos?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                This will reset all Hero Photos back to the original studio presets.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmResetAll}
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[90] bg-stone-950 text-white px-4 py-3 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
