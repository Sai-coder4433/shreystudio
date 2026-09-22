import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit3,
  Star,
  Quote,
  MapPin,
  Calendar,
  X,
  Check,
  RotateCcw,
  AlertTriangle,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import { useStudioData } from '../../context/StudioDataContext';
import { StudioTestimonialItem } from '../../types';

export const ReviewsManager: React.FC = () => {
  const {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    resetReviews,
    isCloudConnected,
  } = useStudioData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<StudioTestimonialItem | null>(null);

  // Confirmation Modals
  const [reviewToDelete, setReviewToDelete] = useState<StudioTestimonialItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Form State
  const [couple, setCouple] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [weddingType, setWeddingType] = useState('Wedding Photography');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [heirloomDelivered, setHeirloomDelivered] = useState('Archival Heritage Book');

  const openAddModal = () => {
    setCouple('');
    setVenue('');
    setLocation('Pune, Maharashtra');
    setDate('2025');
    setWeddingType('Wedding Photography');
    setQuote('');
    setRating(5);
    setHeirloomDelivered('Archival Heritage Book');
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (r: StudioTestimonialItem) => {
    setEditingReview(r);
    setCouple(r.couple);
    setVenue(r.venue);
    setLocation(r.location);
    setDate(r.date);
    setWeddingType(r.weddingType);
    setQuote(r.quote);
    setRating(r.rating || 5);
    setHeirloomDelivered(r.heirloomDelivered || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!couple.trim() || !quote.trim()) {
      alert('Please provide client/couple name and their review quote.');
      return;
    }

    const reviewData = {
      couple: couple.trim(),
      venue: venue.trim() || 'Pune',
      location: location.trim() || 'Maharashtra',
      date: date.trim() || '2025',
      weddingType: weddingType.trim() || 'Photography',
      quote: quote.trim(),
      rating: Number(rating) || 5,
      heirloomDelivered: heirloomDelivered.trim() || 'Heritage Heirloom',
    };

    if (editingReview) {
      updateReview(editingReview.id, reviewData);
      showToast('✓ Review updated successfully in database!');
    } else {
      addReview(reviewData);
      showToast('✓ New review added & synced to cloud!');
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!reviewToDelete) return;
    deleteReview(reviewToDelete.id);
    showToast(`✓ Removed review for ${reviewToDelete.couple}`);
    setReviewToDelete(null);
  };

  const confirmReset = () => {
    resetReviews();
    showToast('✓ Reset reviews to studio defaults');
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold font-['Cormorant_Garamond'] text-stone-900">
              Client Reviews & Testimonials
            </h2>
            {isCloudConnected && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <Cloud className="w-3 h-3" />
                <span>Live Synced</span>
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 font-['Plus_Jakarta_Sans']">
            Manage couple feedback displayed in the smooth running loop ticker on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to original default reviews"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Review</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r, index) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
          >
            <div>
              {/* Header: Stars & Category */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                  {r.weddingType}
                </span>
              </div>

              {/* Quote */}
              <div className="flex items-start gap-2 my-2.5">
                <Quote className="w-4 h-4 text-amber-600/40 shrink-0 mt-0.5" />
                <p className="font-['Cormorant_Garamond'] text-base italic text-stone-800 leading-snug">
                  “{r.quote}”
                </p>
              </div>
            </div>

            {/* Bottom Meta & Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-3">
              <div>
                <h4 className="font-['Cormorant_Garamond'] text-lg font-bold text-stone-900 leading-none">
                  {r.couple}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 mt-1">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{r.venue}, {r.location}</span>
                  {r.date && <span>• {r.date}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEditModal(r)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Edit Review"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setReviewToDelete(r)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900 mb-1">
              {editingReview ? 'Edit Review' : 'Add New Client Review'}
            </h3>
            <p className="text-xs text-stone-500 mb-5 font-['Plus_Jakarta_Sans']">
              This review will appear in the running loop ticker on the homepage and sync with Firebase.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Couple / Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={couple}
                  onChange={(e) => setCouple(e.target.value)}
                  placeholder="e.g. Snehal & Rohan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Venue / Event Hall
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. JW Marriott / Grand Mandap"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Chakan, Pune"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Shoot Type
                  </label>
                  <select
                    value={weddingType}
                    onChange={(e) => setWeddingType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600 bg-white"
                  >
                    <option value="Wedding Photography">Wedding</option>
                    <option value="Pre-Wedding & Film">Pre-Wedding</option>
                    <option value="Maternity & Family">Maternity</option>
                    <option value="Destination Wedding">Destination</option>
                    <option value="Fashion & Portrait">Fashion</option>
                    <option value="Commercial & Brand">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Date / Season
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Feb 2025"
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600 bg-white"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Review Text / Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="e.g. Shreyash and team were incredible throughout our wedding. The candid photos and films feel like a cinematic dream."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-amber-600 resize-none font-['Plus_Jakarta_Sans']"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  {editingReview ? 'Save Changes' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {reviewToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setReviewToDelete(null)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900 mb-1">
              Delete Review?
            </h4>
            <p className="text-xs text-stone-500 mb-5 font-['Plus_Jakarta_Sans']">
              Are you sure you want to delete the review from{' '}
              <span className="font-bold text-stone-900">{reviewToDelete.couple}</span>? This will remove it from the website.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setReviewToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsResetConfirmOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold text-stone-900 mb-1">
              Reset to Defaults?
            </h4>
            <p className="text-xs text-stone-500 mb-5 font-['Plus_Jakarta_Sans']">
              This will restore the 5 original curated client reviews and overwrite custom additions.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
