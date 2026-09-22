import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle, MapPin, User, Phone, Sparkles, FileText, ArrowRight, ExternalLink } from 'lucide-react';

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHOOT_TYPES = [
  'Wedding Photography & Cinematography (लग्न व सिनेमॅटोग्राफी)',
  'Pre-Wedding Shoot (प्री-वेडिंग शूट)',
  'Maternity & Baby Photoshoot (मॅटर्निटी व बेबी शूट)',
  'Event & Traditional Ceremonies (कौटुंबिक कार्यक्रम व सोहळे)',
  'Fashion & Creative Portrait (फॅशन व पोर्ट्रेट)',
  'Commercial & Corporate Shoot (कमर्शियल व कॉर्पोरेट)',
  'Product Photography (प्रॉडक्ट फोटोग्राफी)',
  'Destination Wedding / Shoot (डेस्टिनेशन वेडिंग)',
  'Other Custom Project (इतर चौकशी)',
];

const WHATSAPP_NUMBER = '917517443240';
const DISPLAY_PHONE = '+91 75174 43240';

export const BookSessionModal: React.FC<BookSessionModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shootType, setShootType] = useState(SHOOT_TYPES[0]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const lines = [
      '✨ *NEW BOOKING INQUIRY — SHREY STUDIO* ✨',
      '',
      `👤 *Name / Couple:* ${name.trim()}`,
      `📞 *Contact Number:* ${phone.trim()}`,
      `📸 *Type of Shoot:* ${shootType}`,
      `📍 *Location / Venue:* ${location.trim()}`,
      `📝 *Notes & Vision:* ${notes.trim() ? notes.trim() : 'None provided'}`,
      '',
      '───────────────',
      '🔗 _Sent directly from Shrey Studio Portfolio Website_',
    ];

    const message = lines.join('\n');
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    setRedirectUrl(waUrl);
    setSubmitted(true);

    // Open WhatsApp in a new tab / app
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // If popup blocker intervened, the user can click the button on the confirmation screen
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setShootType(SHOOT_TYPES[0]);
    setLocation('');
    setNotes('');
    setSubmitted(false);
    setRedirectUrl('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-stone-200 my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold font-['Plus_Jakarta_Sans'] uppercase tracking-wider mb-3">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Redirecting to WhatsApp</span>
            </div>

            <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
              Inquiry Generated
            </h3>

            <p className="font-['Plus_Jakarta_Sans'] text-sm text-stone-600 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <span className="font-bold text-stone-950">{name}</span>! Your inquiry details for{' '}
              <span className="font-semibold text-stone-900">{shootType}</span> in{' '}
              <span className="font-semibold text-stone-900">{location}</span> are ready to be sent directly to Shreyash Gore on WhatsApp ({DISPLAY_PHONE}).
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-['Plus_Jakarta_Sans'] text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-['Plus_Jakarta_Sans'] text-sm font-semibold transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge & Title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-[0.25em] text-amber-700 uppercase">
                Bespoke Inquiries · Shrey Studio
              </span>
            </div>

            <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-bold text-stone-950 mb-2">
              Book Your Session
            </h2>

            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-stone-500 mb-6 font-normal">
              Fill in your shoot requirements below. Your inquiry redirects directly to our official WhatsApp{' '}
              <span className="font-bold text-stone-800">({DISPLAY_PHONE})</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Name */}
              <div>
                <label className="block font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Name / Couple Name (नाव) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul & Snehal / Aditi Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-['Plus_Jakarta_Sans'] transition-colors"
                />
              </div>

              {/* 2. Phone / WhatsApp Number */}
              <div>
                <label className="block font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Phone / WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 75174 XXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-['Plus_Jakarta_Sans'] transition-colors"
                />
              </div>

              {/* 3. Type of Shoot (English mainly + Marathi) */}
              <div>
                <label className="block font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Type of Shoot / शुटचा प्रकार *</span>
                </label>
                <div className="relative">
                  <select
                    value={shootType}
                    onChange={(e) => setShootType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white text-sm text-stone-900 focus:outline-none focus:border-amber-600 font-['Plus_Jakarta_Sans'] transition-colors appearance-none cursor-pointer"
                  >
                    {SHOOT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-stone-500">
                    ▼
                  </div>
                </div>
              </div>

              {/* 4. Location */}
              <div>
                <label className="block font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Shoot Location / Venue (ठिकाण) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Chakan, Pune / Moshi / PCMC / Destination"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-['Plus_Jakarta_Sans'] transition-colors"
                />
              </div>

              {/* 5. Notes */}
              <div>
                <label className="block font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider text-stone-700 uppercase mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Notes / Preferred Dates & Vision</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention preferred dates, event schedule, rituals, or any special requests..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 font-['Plus_Jakarta_Sans'] transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold tracking-wide transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Send Inquiry to WhatsApp ({DISPLAY_PHONE})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2 font-['Plus_Jakarta_Sans']">
                  Redirects directly to our official WhatsApp chat with your inquiry pre-filled.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
