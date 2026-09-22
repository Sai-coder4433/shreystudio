import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Layers,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Sliders,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Shield,
  ShieldCheck,
  LogOut,
  ExternalLink,
  X,
  Zap,
  Star,
} from 'lucide-react';
import { useStudioData } from '../../context/StudioDataContext';
import { HeroPhotosManager } from './HeroPhotosManager';
import { StoriesManager } from './StoriesManager';
import { ReviewsManager } from './ReviewsManager';
import {
  verifyAdminCredentials,
  updateAdminCredentialsInCloud,
} from '../../firebase/firestoreService';

const SESSION_STORAGE_KEY = 'shrey_studio_admin_session_v2';

const isSessionAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === 'active';
  } catch {
    return false;
  }
};

const persistSession = (active: boolean) => {
  try {
    if (active) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'active');
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch {
    // Ignore storage issues
  }
};

// ─────────────────────────────────────────────────────────────────────
// AdminPanel Props
// ─────────────────────────────────────────────────────────────────────
interface AdminPanelProps {
  onClose: () => void;
}

// ─────────────────────────────────────────────────────────────────────
// SECURE LOGIN SCREEN (Zero Plaintext Secrets)
// ─────────────────────────────────────────────────────────────────────
const AdminLoginScreen: React.FC<{ onLoginSuccess: () => void; onClose: () => void }> = ({
  onLoginSuccess,
  onClose,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      setError('Please provide both username/email and password.');
      setIsLoading(false);
      triggerShake();
      return;
    }

    try {
      const isValid = await verifyAdminCredentials(cleanId, cleanPass);
      if (isValid) {
        persistSession(true);
        onLoginSuccess();
      } else {
        triggerShake();
        setError('Invalid username or password. Access denied.');
        setIsLoading(false);
      }
    } catch {
      triggerShake();
      setError('Authentication failed. Please check network connection.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#fbfaf8] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans'] overflow-y-auto">
      {/* Subtle dot background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1c1917 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top accent bar */}
      <div className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-10" />

      {/* Return to website link */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-600 hover:text-stone-900 shadow-xs hover:bg-stone-50 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
        <span>Back to Live Website</span>
      </button>

      <div className={`relative w-full max-w-md my-8 transition-transform ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-stone-300/50 overflow-hidden border border-stone-200">
          {/* Header banner with Official Logo */}
          <div className="bg-stone-950 px-8 pt-9 pb-7 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner p-2.5">
              <img
                src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
                alt="Professional Photography and Cinematography Studio Logo"
                className="w-full h-full object-contain filter invert brightness-200"
              />
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold text-white tracking-tight">
              SHREY STUDIO
            </h1>
            <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase mt-0.5">
              AUTHORIZED STUDIO PORTAL
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-semibold text-stone-300 tracking-wide">
                  Encrypted & Protected
                </span>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="px-7 sm:px-8 py-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email or Username field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Admin Email or Username
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Enter administrator ID"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 pr-11 text-sm text-stone-900 placeholder-stone-400 focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error display */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-[fadeIn_0.2s_ease-out]">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 active:scale-[0.99] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-stone-950/20 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Access…</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Sign In to Admin Panel</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-stone-400 mt-4 font-medium">
          Shrey Studio · Professional Photography & Cinematography · Chakan, Pune
        </p>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-8px); }
          30%      { transform: translateX(8px); }
          45%      { transform: translateX(-5px); }
          60%      { transform: translateX(5px); }
          75%      { transform: translateX(-2px); }
          90%      { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────
const AdminDashboard: React.FC<AdminPanelProps & { onLogout: () => void }> = ({
  onClose,
  onLogout,
}) => {
  const {
    heroPhotos,
    stories,
    reviews,
    resetAll,
    exportData,
    importData,
    isCloudConnected,
    isSyncing,
  } = useStudioData();
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'stories' | 'reviews' | 'backup' | 'security'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live Database Credentials management (Zero Plaintext Secrets)
  const [adminId, setAdminId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingCreds, setIsSavingCreds] = useState(false);

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !newPassword.trim()) {
      alert('Administrator ID and new password cannot be empty.');
      return;
    }
    if (newPassword.trim().length < 8) {
      alert('Password must be at least 8 characters long for security.');
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    setIsSavingCreds(true);
    const success = await updateAdminCredentialsInCloud(adminId.trim(), newPassword.trim());
    setIsSavingCreds(false);
    if (success) {
      setNewPassword('');
      setConfirmPassword('');
      showToast('✓ Admin credentials securely hashed and updated in database!');
    } else {
      alert('Failed to update credentials. Please check connection and permissions.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importData(event.target?.result as string);
      if (success) showToast('✓ Backup restored successfully!');
      else alert('Invalid backup file. Please use a valid JSON export.');
    };
    reader.readAsText(file);
  };

  const handleResetAll = () => {
    if (confirm('Reset ALL Hero Photos and Stories to factory originals? This cannot be undone.')) {
      resetAll();
      showToast('✓ Reset to factory originals complete.');
    }
  };

  const navItems = [
    { id: 'overview' as const, label: 'Dashboard', icon: Sparkles, count: null },
    { id: 'hero' as const, label: 'Hero 3D Photos', icon: Camera, count: heroPhotos.length },
    { id: 'stories' as const, label: 'Featured Stories', icon: Layers, count: stories.length },
    { id: 'reviews' as const, label: 'Client Reviews', icon: Star, count: reviews.length },
    { id: 'security' as const, label: 'Access & Database', icon: ShieldCheck, count: null },
    { id: 'backup' as const, label: 'Backup & Reset', icon: Sliders, count: null },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col font-['Plus_Jakarta_Sans'] overflow-hidden"
      data-lenis-prevent="true"
    >
      {/* Amber top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shrink-0 z-10" />

      {/* ── Header ── */}
      <header className="bg-white border-b border-stone-200 px-5 sm:px-8 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-stone-950 flex items-center justify-center shadow-sm p-1.5 overflow-hidden">
              <img
                src="https://i.postimg.cc/FHbyBsDQ/logo-black-(1).png"
                alt="Professional Photography and Cinematography Studio Logo"
                className="w-full h-full object-contain filter invert brightness-200"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Cormorant_Garamond'] text-xl font-bold tracking-wider text-stone-950">
                  SHREY STUDIO
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold tracking-widest uppercase border border-amber-200">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-stone-400 hidden sm:block font-medium">
                Content Management Portal
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Cloud Sync Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200">
            <span
              className={`w-2 h-2 rounded-full ${
                isSyncing
                  ? 'bg-amber-500 animate-ping'
                  : isCloudConnected
                  ? 'bg-emerald-500'
                  : 'bg-amber-400'
              }`}
            />
            <span className="text-[11px] font-semibold text-stone-700">
              {isSyncing
                ? 'Syncing Cloud…'
                : isCloudConnected
                ? 'Firebase Cloud Live'
                : 'Local Cache Active'}
            </span>
          </div>

          {/* Auth indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="text-[11px] font-semibold text-emerald-700">Authenticated</span>
          </div>

          {/* View site */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer border border-stone-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-stone-50 border-r border-stone-200 py-5 px-3 shrink-0 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer w-full text-left ${
                  isActive
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-white hover:text-stone-900 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Sidebar stats */}
          <div className="mt-auto pt-4 border-t border-stone-200">
            <div className="px-3 py-3 rounded-xl bg-white border border-stone-200 shadow-xs">
              <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 mb-2">Quick Stats</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Hero Photos', val: heroPhotos.length },
                  { label: 'Stories', val: stories.length },
                  { label: 'Gallery Images', val: stories.reduce((a, s) => a + (s.gallery?.length || 1), 0) },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">{stat.label}</span>
                    <span className="font-bold text-stone-800">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Mobile bottom tab bar ── */}
        <div className="md:hidden fixed bottom-0 inset-x-0 z-10 bg-white border-t border-stone-200 flex items-center justify-around px-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-colors cursor-pointer min-w-0 ${
                  isActive ? 'text-stone-950 bg-amber-50' : 'text-stone-400'
                }`}
              >
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                <span className="truncate">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* ── Main Content ── */}
        <main
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto overscroll-contain bg-[#f8f7f5] pb-24 md:pb-10"
        >
          <div className="max-w-6xl w-full mx-auto p-5 sm:p-8">
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-7">
                <div className="bg-stone-950 rounded-2xl p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                  <div className="max-w-xl">
                    <span className="text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase">
                      Bespoke Content Management
                    </span>
                    <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-white tracking-tight mt-2 mb-3">
                      Welcome to Shrey Studio Admin
                    </h2>
                    <p className="text-sm text-stone-400 leading-relaxed">
                      Manage your 3D hero carousel photos, publish wedding story folios, and update portfolio content — all from one place. Changes reflect instantly on the live website.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <button type="button" onClick={() => setActiveTab('hero')} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors">
                      <Plus className="w-4 h-4" />Add Hero Photo
                    </button>
                    <button type="button" onClick={() => setActiveTab('stories')} className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors">
                      <Plus className="w-4 h-4 text-amber-400" />Publish Story
                    </button>
                    <button type="button" onClick={() => setActiveTab('reviews')} className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 flex items-center gap-2 cursor-pointer whitespace-nowrap transition-colors">
                      <Star className="w-4 h-4 text-amber-400" />Manage Reviews
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { label: 'Hero 3D Photos', value: heroPhotos.length, Icon: Camera, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', note: 'Rotating 3D cylinder', tab: 'hero' as const },
                    { label: 'Featured Stories', value: stories.length, Icon: Layers, color: 'text-stone-700', bg: 'bg-stone-100', border: 'border-stone-200', note: 'Stacking folio layers', tab: 'stories' as const },
                    { label: 'Client Reviews', value: reviews.length, Icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', note: 'Homepage loop ticker', tab: 'reviews' as const },
                    { label: 'Gallery Images', value: stories.reduce((a, s) => a + (s.gallery?.length || 1), 0), Icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', note: 'In story lightboxes', tab: null },
                    { label: 'Storage', value: '✓ Synced', Icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', note: 'Auto-persisted locally', tab: null },
                  ].map((stat) => (
                    <div key={stat.label} onClick={() => stat.tab && setActiveTab(stat.tab)}
                      className={`bg-white border ${stat.border} rounded-2xl p-5 flex flex-col gap-3 shadow-xs ${stat.tab ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}>
                      <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.Icon className={`w-4.5 h-4.5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold font-['Cormorant_Garamond'] ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs font-bold text-stone-700 mt-0.5">{stat.label}</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">{stat.note}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Guide */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { title: 'Managing Hero 3D Carousel', Icon: Camera, points: [
                      'Upload from your computer or paste an image URL.',
                      'Images auto-compress for smooth 60fps 3D rendering.',
                      'New photos instantly appear on the rotating cylinder.',
                      'Hover photos to see title card; click to open lightbox.',
                    ]},
                    { title: 'Managing Featured Stories', Icon: Layers, points: [
                      'Add couple name, palace venue, season & editorial quote.',
                      'Upload multiple gallery photos for the story lightbox.',
                      'Add commission deliverables displayed on the story card.',
                      'Stories appear as sticky stacking physical folio layers.',
                    ]},
                  ].map((card) => (
                    <div key={card.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                          <card.Icon className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="font-['Cormorant_Garamond'] text-xl font-bold text-stone-900">{card.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {card.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs text-stone-600">
                            <span className="text-amber-500 font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'hero' && <HeroPhotosManager />}
            {activeTab === 'stories' && <StoriesManager />}
            {activeTab === 'reviews' && <ReviewsManager />}

            {/* SECURITY & DATABASE */}
            {activeTab === 'security' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-stone-900">
                      Access & Database
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      Firebase Connected
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">
                    Manage studio administrator credentials stored securely in Firebase Firestore.
                  </p>
                </div>

                {/* Cloud Connection Overview Card */}
                <div className="bg-stone-950 text-white rounded-2xl p-6 shadow-xl border border-stone-800 relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-100">Firebase Firestore Native</h4>
                        <p className="text-[11px] text-stone-400">Real-time database sync active</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-800 text-xs">
                    <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800/80">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Project ID</span>
                      <span className="font-mono text-amber-300 font-semibold truncate block">shrey-studio-6a2d1</span>
                    </div>
                    <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800/80">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Auth Doc Path</span>
                      <span className="font-mono text-stone-200 font-semibold truncate block">admin_config/access</span>
                    </div>
                    <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800/80 col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Access State</span>
                      <span className="font-semibold text-emerald-400 block">Protected (SHA-256)</span>
                    </div>
                  </div>
                </div>

                {/* Secure Credentials Form Card */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h4 className="text-base font-bold text-stone-900">Update Administrator Password</h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Passwords are cryptographically hashed using SHA-256 before cloud storage.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveCredentials} className="space-y-4">
                    {/* Admin ID / Username */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                        Administrator ID (Username or Email)
                      </label>
                      <input
                        type="text"
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        placeholder="e.g. chakankarsai@gmail.com or shreyAdmin"
                        className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Password */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                          New Secure Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full bg-stone-50 border border-stone-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-stone-900 font-medium focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <p className="text-[11px] text-stone-500">
                        ⚡ Cryptographically hashed before saving to cloud.
                      </p>
                      <button
                        type="submit"
                        disabled={isSavingCreds}
                        className="px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 active:scale-95 text-white text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                      >
                        {isSavingCreds ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                            <span>Encrypting & Saving…</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            <span>Save Hashed Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* BACKUP */}
            {activeTab === 'backup' && (
              <div className="max-w-2xl mx-auto space-y-5">
                <div className="mb-2">
                  <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold text-stone-900">Backup & Restore</h3>
                  <p className="text-sm text-stone-500 mt-1">Export, import, or reset your studio data safely.</p>
                </div>

                {[
                  { title: 'Export JSON Backup', desc: 'Download a complete JSON backup of all Hero Photos and Stories.', btnText: 'Download', btnIcon: Download, btnClass: 'bg-stone-950 hover:bg-stone-800 text-white', action: () => { exportData(); showToast('✓ Backup file downloaded!'); } },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xs">
                    <div><h4 className="text-sm font-bold text-stone-800">{item.title}</h4><p className="text-xs text-stone-500 mt-0.5">{item.desc}</p></div>
                    <button type="button" onClick={item.action} className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shrink-0 transition-colors shadow-sm ${item.btnClass}`}>
                      <item.btnIcon className="w-4 h-4" />{item.btnText}
                    </button>
                  </div>
                ))}

                <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xs">
                  <div><h4 className="text-sm font-bold text-stone-800">Import JSON Backup</h4><p className="text-xs text-stone-500 mt-0.5">Restore a previously exported JSON backup file.</p></div>
                  <div>
                    <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl border border-stone-200 flex items-center gap-2 cursor-pointer shrink-0 transition-colors">
                      <Upload className="w-4 h-4" />Upload JSON
                    </button>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div><h4 className="text-sm font-bold text-red-800">Factory Reset All Data</h4><p className="text-xs text-red-600 mt-0.5">Permanently reset Hero Photos & Stories to the default originals. Cannot be undone.</p></div>
                  <button type="button" onClick={handleResetAll} className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shrink-0 transition-colors">
                    <RotateCcw className="w-4 h-4" />Reset All
                  </button>
                </div>

                <div className="bg-stone-100 border border-stone-200 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div><h4 className="text-sm font-bold text-stone-800">Sign Out of Admin Panel</h4><p className="text-xs text-stone-500 mt-0.5">End your session. You'll need to log in again to access the portal.</p></div>
                  <button type="button" onClick={onLogout} className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shrink-0 transition-colors">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] bg-stone-950 text-white px-4 py-3 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {toastMessage}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// ROOT AdminPanel — manages login gate & session
// ─────────────────────────────────────────────────────────────────────
export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [authed, setAuthed] = useState<boolean>(() => isSessionAuthenticated());

  const handleLoginSuccess = useCallback(() => {
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    persistSession(false);
    setAuthed(false);
  }, []);

  if (!authed) {
    return <AdminLoginScreen onLoginSuccess={handleLoginSuccess} onClose={onClose} />;
  }

  return <AdminDashboard onClose={onClose} onLogout={handleLogout} />;
};
