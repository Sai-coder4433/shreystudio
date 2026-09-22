import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Layers,
  BookOpen,
  MapPin,
  Calendar,
  X,
  Check,
  Image as ImageIcon,
  RotateCcw,
  AlertTriangle,
  Cloud,
} from 'lucide-react';
import { useStudioData } from '../../context/StudioDataContext';
import { StoryItem } from '../../types';
import { ImageUploadField } from './ImageUploadField';

export const StoriesManager: React.FC = () => {
  const {
    stories,
    addStory,
    updateStory,
    deleteStory,
    resetStories,
    isCloudConnected,
  } = useStudioData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<StoryItem | null>(null);

  // In-app Delete & Reset Confirmation Modals
  const [storyToDelete, setStoryToDelete] = useState<StoryItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Royal Palace Destination');
  const [quote, setQuote] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [newDeliverableInput, setNewDeliverableInput] = useState('');
  const [pendingGalleryUrl, setPendingGalleryUrl] = useState('');

  const openAddModal = () => {
    setTitle('');
    setNumber(`STORY 0${stories.length + 1}`);
    setSeason('Winter 2026');
    setLocation('');
    setCategory('Royal Palace Destination');
    setQuote('');
    setDescription('');
    setCoverImage('');
    setGallery([]);
    setDeliverables(['Full Wedding Coverage', 'Handcrafted Heirloom Album']);
    setEditingStory(null);
    setIsModalOpen(true);
  };

  const openEditModal = (story: StoryItem) => {
    setTitle(story.title);
    setNumber(story.number);
    setSeason(story.season);
    setLocation(story.location);
    setCategory(story.category);
    setQuote(story.quote);
    setDescription(story.description);
    setCoverImage(story.image);
    setGallery(story.gallery || []);
    setDeliverables(story.deliverables || []);
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter couple / story title.');
      return;
    }
    if (!coverImage.trim()) {
      alert('Please provide a cover image.');
      return;
    }

    const data = {
      title: title.trim(),
      number: number.trim() || `STORY 0${stories.length + 1}`,
      season: season.trim() || '2026',
      location: location.trim() || 'Heritage Destination',
      category: category.trim() || 'Royal Palace Destination',
      quote: quote.trim() || `"${title}"`,
      description: description.trim(),
      image: coverImage.trim(),
      gallery: gallery.length > 0 ? gallery : [coverImage.trim()],
      deliverables:
        deliverables.length > 0
          ? deliverables
          : ['Full Wedding Coverage', 'Archival Album'],
    };

    if (editingStory) {
      updateStory(editingStory.id, data);
      showToast(`✓ Story "${title.trim()}" updated & synced to Cloud!`);
    } else {
      addStory(data);
      showToast(`✓ Story "${title.trim()}" published & synced to Cloud!`);
    }
    setIsModalOpen(false);
  };

  const confirmDeleteStory = () => {
    if (storyToDelete) {
      deleteStory(storyToDelete.id);
      showToast(`✓ Story "${storyToDelete.title}" deleted.`);
      setStoryToDelete(null);
    }
  };

  const confirmResetAll = () => {
    resetStories();
    showToast('✓ Featured Stories reset to original presets.');
    setIsResetConfirmOpen(false);
  };

  const addDeliverable = () => {
    if (newDeliverableInput.trim()) {
      setDeliverables([...deliverables, newDeliverableInput.trim()]);
      setNewDeliverableInput('');
    }
  };

  return (
    <div className="space-y-6" data-lenis-prevent="true">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-amber-600" />
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
              Featured Wedding Stories
            </h3>
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-200">
              {stories.length} Stories
            </span>
            {isCloudConnected && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
                <Cloud className="w-3 h-3 text-emerald-600" />
                <span>Cloud Synced</span>
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500">
            Stories appear as sticky stacking folio layers with full editorial detail pages. Synced to Firebase Cloud in real-time.
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
            className="px-4 py-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Story</span>
          </button>
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-3">
        {stories.map((story, idx) => (
          <div
            key={story.id}
            className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-amber-400 hover:shadow-xs transition-all shadow-xs"
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              {/* Thumbnail */}
              <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400';
                  }}
                />
                <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-amber-400 font-mono">
                  L0{idx + 1}
                </span>
              </div>

              {/* Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {story.number}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-500">{story.category}</span>
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-xl font-bold text-stone-900 leading-tight truncate">
                  {story.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    {story.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {story.season}
                  </span>
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-stone-400" />
                    {story.gallery?.length || 1} photos
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => openEditModal(story)}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 text-stone-700 text-xs font-bold rounded-xl border border-stone-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Edit story"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setStoryToDelete(story)}
                className="px-3 py-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                title="Delete story"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        ))}

        {stories.length === 0 && (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl">
            <Layers className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-stone-600">No Stories Yet</h4>
            <p className="text-xs text-stone-400 mt-1">Create your first wedding story folio.</p>
            <button
              type="button"
              onClick={openAddModal}
              className="mt-4 px-4 py-2 bg-stone-950 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Create Story
            </button>
          </div>
        )}
      </div>

      {/* ── Edit / Add Story Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div
            className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl my-auto"
            data-lenis-prevent="true"
          >
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-stone-100 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900">
                  {editingStory ? `Edit Story: ${editingStory.title}` : 'Create Wedding Story'}
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

            <form onSubmit={handleSave} className="px-6 py-6 space-y-5">
              {/* Title + Number */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Couple / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aditi & Ranveer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Story Tag
                  </label>
                  <input
                    type="text"
                    placeholder="STORY 05"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 font-mono placeholder-stone-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Location + Season */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Venue & Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="UMAID BHAWAN, JODHPUR"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 uppercase placeholder-stone-400 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Season
                  </label>
                  <input
                    type="text"
                    placeholder="Winter 2026"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Category + Quote */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Royal Palace Destination"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Highlight Quote
                  </label>
                  <input
                    type="text"
                    placeholder='"A Regal Heritage Union"'
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the atmosphere, moments, and emotion of the wedding..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors leading-relaxed resize-none"
                />
              </div>

              {/* Cover Image */}
              <ImageUploadField
                label="Cover Image"
                value={coverImage}
                onChange={setCoverImage}
                required
                aspectRatioHint="Recommended: 16:10 landscape or 1200×750 high resolution"
              />

              {/* Gallery Photos */}
              <div className="border-t border-stone-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                    Gallery Photos ({gallery.length})
                  </label>
                  <span className="text-[11px] text-stone-400">Shown in story detail page & lightbox</span>
                </div>

                <ImageUploadField
                  label="Add Image to Gallery"
                  value={pendingGalleryUrl}
                  onChange={(url) => {
                    if (url) {
                      setGallery([...gallery, url]);
                      setPendingGalleryUrl('');
                    }
                  }}
                  aspectRatioHint="Each image adds to the wedding gallery"
                />

                {gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {gallery.map((img, i) => (
                      <div
                        key={i}
                        className="relative group aspect-square rounded-xl overflow-hidden border border-stone-200 bg-stone-50"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setGallery(gallery.filter((_, j) => j !== i))}
                          className="absolute top-1 right-1 p-1 rounded-full bg-white/90 text-stone-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white font-mono">
                          #{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Deliverables */}
              <div className="border-t border-stone-100 pt-4 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Deliverables ({deliverables.length})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 4K Cinematic Heirloom Film"
                    value={newDeliverableInput}
                    onChange={(e) => setNewDeliverableInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addDeliverable();
                      }
                    }}
                    className="flex-1 bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl border border-stone-200 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => setDeliverables(deliverables.filter((_, j) => j !== i))}
                        className="text-amber-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
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
                  className="px-6 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingStory ? 'Save Changes' : 'Publish Story'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── In-App Delete Confirmation Modal ── */}
      {storyToDelete && (
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
                Delete Story?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Are you sure you want to delete <span className="font-bold text-stone-800">"{storyToDelete.title}"</span>? This will remove the wedding story from the site and Firebase Cloud.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setStoryToDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteStory}
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
                Reset Featured Stories?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                This will reset all Featured Stories back to the original default presets.
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
