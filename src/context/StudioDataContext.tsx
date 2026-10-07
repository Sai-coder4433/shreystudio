import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { PhotoItem, StoryItem, StudioTestimonialItem } from '../types';
import { HERO_PHOTOS } from '../data/photos';
import { FEATURED_STORIES, CLIENT_TESTIMONIALS } from '../data/shreyStudioData';
import {
  getHeroPhotosFromCloud,
  saveHeroPhotosToCloud,
  getStoriesFromCloud,
  saveStoriesToCloud,
  getReviewsFromCloud,
  saveReviewsToCloud,
  subscribeToCloudStudioData,
} from '../firebase/firestoreService';

const STORAGE_KEY_HERO = 'shrey_studio_hero_photos_v1';
const STORAGE_KEY_STORIES = 'shrey_studio_featured_stories_v1';
const STORAGE_KEY_REVIEWS = 'shrey_studio_client_reviews_v1';

interface StudioDataContextType {
  heroPhotos: PhotoItem[];
  stories: StoryItem[];
  reviews: StudioTestimonialItem[];
  addHeroPhoto: (photo: Omit<PhotoItem, 'id'> & { id?: string }) => void;
  updateHeroPhoto: (id: string, updated: Partial<PhotoItem>) => void;
  deleteHeroPhoto: (id: string) => void;
  resetHeroPhotos: () => void;
  addStory: (story: Omit<StoryItem, 'id'> & { id?: string }) => void;
  updateStory: (id: string, updated: Partial<StoryItem>) => void;
  deleteStory: (id: string) => void;
  resetStories: () => void;
  addReview: (review: Omit<StudioTestimonialItem, 'id'> & { id?: string }) => void;
  updateReview: (id: string, updated: Partial<StudioTestimonialItem>) => void;
  deleteReview: (id: string) => void;
  resetReviews: () => void;
  resetAll: () => void;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
  compressImage: (file: File, maxWidth?: number, quality?: number) => Promise<string>;
  isCloudConnected: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
}

const StudioDataContext = createContext<StudioDataContextType | undefined>(undefined);

// Helper to compress images to reasonable base64 data URLs for storage
export const compressImageFile = (
  file: File,
  maxWidth = 1400,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const StudioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cloud sync states
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  const isInitialCloudSyncDone = useRef(false);

  // Load hero photos from localStorage or defaults
  const [heroPhotos, setHeroPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HERO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-heal any stale 404 photo URL from old local storage
          return parsed.map((p: PhotoItem) => {
            if (p.url && p.url.includes('1579783902614-a3fb3927b675')) {
              return { ...p, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop' };
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse hero photos from storage:', e);
    }
    return HERO_PHOTOS;
  });

  // Load featured stories from localStorage or defaults
  const [stories, setStories] = useState<StoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse featured stories from storage:', e);
    }
    return FEATURED_STORIES;
  });

  // Load reviews from localStorage or defaults
  const [reviews, setReviews] = useState<StudioTestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse reviews from storage:', e);
    }
    return CLIENT_TESTIMONIALS;
  });

  // Sync to Firestore cloud in background
  const syncHeroPhotosToCloud = async (items: PhotoItem[]) => {
    setIsSyncing(true);
    const ok = await saveHeroPhotosToCloud(items);
    if (ok) {
      setIsCloudConnected(true);
      setLastSyncTime(new Date());
    }
    setIsSyncing(false);
  };

  const syncStoriesToCloud = async (items: StoryItem[]) => {
    setIsSyncing(true);
    const ok = await saveStoriesToCloud(items);
    if (ok) {
      setIsCloudConnected(true);
      setLastSyncTime(new Date());
    }
    setIsSyncing(false);
  };

  const syncReviewsToCloud = async (items: StudioTestimonialItem[]) => {
    setIsSyncing(true);
    const ok = await saveReviewsToCloud(items);
    if (ok) {
      setIsCloudConnected(true);
      setLastSyncTime(new Date());
    }
    setIsSyncing(false);
  };

  // Sync hero photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(heroPhotos));
    } catch (e) {
      console.error('LocalStorage quota exceeded while saving hero photos:', e);
    }
  }, [heroPhotos]);

  // Sync stories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('LocalStorage quota exceeded while saving stories:', e);
    }
  }, [stories]);

  // Sync reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error('LocalStorage quota exceeded while saving reviews:', e);
    }
  }, [reviews]);

  // Initial cloud fetch & real-time subscription
  useEffect(() => {
    let unsubscribe = () => {};

    const initializeCloud = async () => {
      try {
        setIsSyncing(true);

        // Try to fetch existing cloud data
        const [cloudHero, cloudStories, cloudReviews] = await Promise.all([
          getHeroPhotosFromCloud(),
          getStoriesFromCloud(),
          getReviewsFromCloud(),
        ]);

        if (cloudHero && cloudHero.length > 0) {
          setHeroPhotos(cloudHero);
        } else {
          saveHeroPhotosToCloud(heroPhotos);
        }

        if (cloudStories && cloudStories.length > 0) {
          setStories(cloudStories);
        } else {
          saveStoriesToCloud(stories);
        }

        if (cloudReviews && cloudReviews.length > 0) {
          setReviews(cloudReviews);
        } else {
          saveReviewsToCloud(reviews);
        }

        setIsCloudConnected(true);
        setLastSyncTime(new Date());
        isInitialCloudSyncDone.current = true;
      } catch (err) {
        console.warn('Firebase initial sync note:', err);
      } finally {
        setIsSyncing(false);
      }

      // Start real-time subscription
      unsubscribe = subscribeToCloudStudioData(
        (updatedPhotos) => {
          if (updatedPhotos && updatedPhotos.length > 0) {
            setHeroPhotos(updatedPhotos);
          }
        },
        (updatedStories) => {
          if (updatedStories && updatedStories.length > 0) {
            setStories(updatedStories);
          }
        },
        (status) => {
          setIsCloudConnected(status.connected);
          if (status.lastSyncedAt) setLastSyncTime(status.lastSyncedAt);
        },
        (updatedReviews) => {
          if (updatedReviews && updatedReviews.length > 0) {
            setReviews(updatedReviews);
          }
        }
      );
    };

    initializeCloud();

    return () => {
      unsubscribe();
    };
  }, []);

  // Hero Photos Actions
  const addHeroPhoto = (photo: Omit<PhotoItem, 'id'> & { id?: string }) => {
    const newId = photo.id || `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newPhotoItem: PhotoItem = {
      ...photo,
      id: newId,
    };
    const updated = [newPhotoItem, ...heroPhotos];
    setHeroPhotos(updated);
    syncHeroPhotosToCloud(updated);
  };

  const updateHeroPhoto = (id: string, updatedFields: Partial<PhotoItem>) => {
    const updated = heroPhotos.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setHeroPhotos(updated);
    syncHeroPhotosToCloud(updated);
  };

  const deleteHeroPhoto = (id: string) => {
    const updated = heroPhotos.filter((p) => p.id !== id);
    setHeroPhotos(updated);
    syncHeroPhotosToCloud(updated);
  };

  const resetHeroPhotos = () => {
    setHeroPhotos(HERO_PHOTOS);
    localStorage.removeItem(STORAGE_KEY_HERO);
    syncHeroPhotosToCloud(HERO_PHOTOS);
  };

  // Stories Actions
  const addStory = (story: Omit<StoryItem, 'id'> & { id?: string }) => {
    const newId = story.id || `story-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const nextLayerNum = `STORY 0${stories.length + 1}`;
    const newStoryItem: StoryItem = {
      ...story,
      id: newId,
      number: story.number || nextLayerNum,
    };
    const updated = [...stories, newStoryItem];
    setStories(updated);
    syncStoriesToCloud(updated);
  };

  const updateStory = (id: string, updatedFields: Partial<StoryItem>) => {
    const updated = stories.map((s) => (s.id === id ? { ...s, ...updatedFields } : s));
    setStories(updated);
    syncStoriesToCloud(updated);
  };

  const deleteStory = (id: string) => {
    const updated = stories.filter((s) => s.id !== id);
    setStories(updated);
    syncStoriesToCloud(updated);
  };

  const resetStories = () => {
    setStories(FEATURED_STORIES);
    localStorage.removeItem(STORAGE_KEY_STORIES);
    syncStoriesToCloud(FEATURED_STORIES);
  };

  // Reviews Actions
  const addReview = (review: Omit<StudioTestimonialItem, 'id'> & { id?: string }) => {
    const newId = review.id || `review-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newReviewItem: StudioTestimonialItem = {
      ...review,
      id: newId,
    };
    const updated = [newReviewItem, ...reviews];
    setReviews(updated);
    syncReviewsToCloud(updated);
  };

  const updateReview = (id: string, updatedFields: Partial<StudioTestimonialItem>) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, ...updatedFields } : r));
    setReviews(updated);
    syncReviewsToCloud(updated);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    syncReviewsToCloud(updated);
  };

  const resetReviews = () => {
    setReviews(CLIENT_TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEY_REVIEWS);
    syncReviewsToCloud(CLIENT_TESTIMONIALS);
  };

  const resetAll = () => {
    resetHeroPhotos();
    resetStories();
    resetReviews();
  };

  // Export JSON backup
  const exportData = () => {
    const data = {
      heroPhotos,
      stories,
      reviews,
      exportedAt: new Date().toISOString(),
      studio: 'Shrey Studio Portfolio',
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shrey-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed.heroPhotos)) {
        setHeroPhotos(parsed.heroPhotos);
        syncHeroPhotosToCloud(parsed.heroPhotos);
      }
      if (Array.isArray(parsed.stories)) {
        setStories(parsed.stories);
        syncStoriesToCloud(parsed.stories);
      }
      if (Array.isArray(parsed.reviews)) {
        setReviews(parsed.reviews);
        syncReviewsToCloud(parsed.reviews);
      }
      return true;
    } catch (e) {
      console.error('Invalid JSON backup data:', e);
      return false;
    }
  };

  return (
    <StudioDataContext.Provider
      value={{
        heroPhotos,
        stories,
        reviews,
        addHeroPhoto,
        updateHeroPhoto,
        deleteHeroPhoto,
        resetHeroPhotos,
        addStory,
        updateStory,
        deleteStory,
        resetStories,
        addReview,
        updateReview,
        deleteReview,
        resetReviews,
        resetAll,
        exportData,
        importData,
        compressImage: compressImageFile,
        isCloudConnected,
        isSyncing,
        lastSyncTime,
      }}
    >
      {children}
    </StudioDataContext.Provider>
  );
};

export const useStudioData = (): StudioDataContextType => {
  const context = useContext(StudioDataContext);
  if (!context) {
    throw new Error('useStudioData must be used within a StudioDataProvider');
  }
  return context;
};
