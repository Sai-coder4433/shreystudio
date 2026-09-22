import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { PhotoItem, StoryItem, StudioTestimonialItem } from '../types';

const STUDIO_COLLECTION = 'studio_content';
const HERO_DOC_ID = 'hero_photos';
const STORIES_DOC_ID = 'featured_stories';
const REVIEWS_DOC_ID = 'client_reviews';

export interface FirebaseSyncStatus {
  connected: boolean;
  lastSyncedAt: Date | null;
  error: string | null;
}

/**
 * Fetch Hero Photos from Firestore
 */
export async function getHeroPhotosFromCloud(): Promise<PhotoItem[] | null> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, HERO_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.items)) {
      return snap.data().items as PhotoItem[];
    }
    return null;
  } catch (err: any) {
    console.warn('Firestore: Could not fetch hero photos, using local fallback:', err?.message);
    return null;
  }
}

/**
 * Save Hero Photos to Firestore
 */
export async function saveHeroPhotosToCloud(items: PhotoItem[]): Promise<boolean> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, HERO_DOC_ID);
    await setDoc(docRef, {
      items,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err: any) {
    console.warn('Firestore: Could not save hero photos:', err?.message);
    return false;
  }
}

/**
 * Fetch Featured Stories from Firestore
 */
export async function getStoriesFromCloud(): Promise<StoryItem[] | null> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, STORIES_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.items)) {
      return snap.data().items as StoryItem[];
    }
    return null;
  } catch (err: any) {
    console.warn('Firestore: Could not fetch stories, using local fallback:', err?.message);
    return null;
  }
}

/**
 * Save Featured Stories to Firestore
 */
export async function saveStoriesToCloud(items: StoryItem[]): Promise<boolean> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, STORIES_DOC_ID);
    await setDoc(docRef, {
      items,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err: any) {
    console.warn('Firestore: Could not save stories:', err?.message);
    return false;
  }
}

/**
 * Fetch Reviews / Testimonials from Firestore
 */
export async function getReviewsFromCloud(): Promise<StudioTestimonialItem[] | null> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, REVIEWS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.items)) {
      return snap.data().items as StudioTestimonialItem[];
    }
    return null;
  } catch (err: any) {
    console.warn('Firestore: Could not fetch reviews, using local fallback:', err?.message);
    return null;
  }
}

/**
 * Save Reviews / Testimonials to Firestore
 */
export async function saveReviewsToCloud(items: StudioTestimonialItem[]): Promise<boolean> {
  try {
    const docRef = doc(db, STUDIO_COLLECTION, REVIEWS_DOC_ID);
    await setDoc(docRef, {
      items,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (err: any) {
    console.warn('Firestore: Could not save reviews:', err?.message);
    return false;
  }
}

/**
 * Subscribe to real-time updates from Firestore
 */
export function subscribeToCloudStudioData(
  onHeroUpdate: (photos: PhotoItem[]) => void,
  onStoriesUpdate: (stories: StoryItem[]) => void,
  onStatusChange?: (status: FirebaseSyncStatus) => void,
  onReviewsUpdate?: (reviews: StudioTestimonialItem[]) => void
) {
  let heroUnsub = () => {};
  let storiesUnsub = () => {};
  let reviewsUnsub = () => {};

  try {
    const heroRef = doc(db, STUDIO_COLLECTION, HERO_DOC_ID);
    heroUnsub = onSnapshot(
      heroRef,
      (docSnap) => {
        if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
          onHeroUpdate(docSnap.data().items as PhotoItem[]);
          onStatusChange?.({
            connected: true,
            lastSyncedAt: new Date(),
            error: null,
          });
        }
      },
      (err) => {
        console.warn('Firestore real-time hero listener error:', err.message);
        onStatusChange?.({
          connected: false,
          lastSyncedAt: null,
          error: err.message,
        });
      }
    );

    const storiesRef = doc(db, STUDIO_COLLECTION, STORIES_DOC_ID);
    storiesUnsub = onSnapshot(
      storiesRef,
      (docSnap) => {
        if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
          onStoriesUpdate(docSnap.data().items as StoryItem[]);
          onStatusChange?.({
            connected: true,
            lastSyncedAt: new Date(),
            error: null,
          });
        }
      },
      (err) => {
        console.warn('Firestore real-time stories listener error:', err.message);
      }
    );

    if (onReviewsUpdate) {
      const reviewsRef = doc(db, STUDIO_COLLECTION, REVIEWS_DOC_ID);
      reviewsUnsub = onSnapshot(
        reviewsRef,
        (docSnap) => {
          if (docSnap.exists() && Array.isArray(docSnap.data()?.items)) {
            onReviewsUpdate(docSnap.data().items as StudioTestimonialItem[]);
            onStatusChange?.({
              connected: true,
              lastSyncedAt: new Date(),
              error: null,
            });
          }
        },
        (err) => {
          console.warn('Firestore real-time reviews listener error:', err.message);
        }
      );
    }
  } catch (err: any) {
    console.warn('Failed to subscribe to cloud data:', err);
    return () => {};
  }

  return () => {
    heroUnsub();
    storiesUnsub();
    reviewsUnsub();
  };
}

// ─────────────────────────────────────────────────────────────────────
// Secure Admin Authentication (Cryptographic Hashes — Zero Plaintext Secrets)
// ─────────────────────────────────────────────────────────────────────

export interface AdminCredentialsRecord {
  usernameHash?: string;
  emailHash?: string;
  passwordHash: string;
  role?: string;
  lastUpdated?: string;
}

const ADMIN_CONFIG_COLLECTION = 'admin_config';
const ADMIN_ACCESS_DOC_ID = 'access';

// Pre-computed SHA-256 authorization digests (no plaintext credentials in client code)
const AUTHORIZED_USER_HASHES = new Set([
  '310d7269afceed6c3fb691c8b54cdd3f4c112b897dd4f1aea1aa54e71204a804',
  'a94e15187d86d64bbc85cbc5674672af5e1edd14d5e9ddb311bce12990acc87a',
  'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd4',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
]);

const AUTHORIZED_PASS_HASHES = new Set([
  '972b5669e4236af5460f5a2582cdcf945b55ae04d87d9d1fdefdc45700a23017',
  '1f77f7a878a8f0b10e185fb8ae5cd37aa616857d49a8ba52f0a44538704e2627',
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
]);

/**
 * Computes a SHA-256 hash using the native browser Web Crypto API
 */
export async function computeHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates admin credentials securely without ever exposing plaintext secrets
 */
export async function verifyAdminCredentials(
  identifier: string,
  passcode: string
): Promise<boolean> {
  try {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = passcode.trim();

    if (!cleanId || !cleanPass) return false;

    const idHash = await computeHash(cleanId);
    const passHash = await computeHash(cleanPass);

    // 1. Check if cloud has updated custom credentials
    try {
      const docRef = doc(db, ADMIN_CONFIG_COLLECTION, ADMIN_ACCESS_DOC_ID);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const cloudData = snap.data() as AdminCredentialsRecord;
        if (cloudData.passwordHash) {
          const cloudPassMatch = cloudData.passwordHash === passHash;
          const cloudUserMatch =
            !cloudData.usernameHash ||
            cloudData.usernameHash === idHash ||
            cloudData.emailHash === idHash ||
            AUTHORIZED_USER_HASHES.has(idHash);

          if (cloudPassMatch && cloudUserMatch) {
            return true;
          }
        }
      }
    } catch {
      // Cloud check failed or offline; fallback to authorized secure hashes
    }

    // 2. Authorize against primary secure hashes
    const isIdValid = AUTHORIZED_USER_HASHES.has(idHash);
    const isPassValid = AUTHORIZED_PASS_HASHES.has(passHash);

    return isIdValid && isPassValid;
  } catch {
    return false;
  }
}

/**
 * Update Admin Credentials securely in Firestore (stores only hashes)
 */
export async function updateAdminCredentialsInCloud(
  identifier: string,
  newPasscode: string
): Promise<boolean> {
  try {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = newPasscode.trim();

    if (!cleanId || !cleanPass) return false;

    const idHash = await computeHash(cleanId);
    const passHash = await computeHash(cleanPass);

    const docRef = doc(db, ADMIN_CONFIG_COLLECTION, ADMIN_ACCESS_DOC_ID);
    await setDoc(
      docRef,
      {
        usernameHash: idHash,
        passwordHash: passHash,
        role: 'Super Administrator',
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (err: any) {
    console.error('Firestore: Could not update credentials:', err?.message);
    return false;
  }
}

