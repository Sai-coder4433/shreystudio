import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

/**
 * Compresses an image file in the browser canvas and returns an optimized JPEG Blob.
 * Keeps resolution crisp (up to 1600px) while reducing file size from 10MB+ down to ~150-300KB.
 */
export function compressImageToBlob(
  file: File,
  maxWidth = 2200,
  quality = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If not an image, resolve with original file
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

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
          resolve(file);
          return;
        }

        // High quality bicubic resampling for sharp HD output
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads an image file to Firebase Cloud Storage and returns its permanent public HTTPS URL.
 * Automatically compresses client-side to minimize bandwidth and upload time.
 */
export async function uploadImageToCloud(
  file: File,
  folder = 'hero_photos',
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  try {
    // 1. Optimize image to a lightweight JPEG Blob
    const optimizedBlob = await compressImageToBlob(file, 1600, 0.85);

    // 2. Generate clean storage path
    const timestamp = Date.now();
    const cleanName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/\.[^/.]+$/, '');
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const storagePath = `${folder}/${timestamp}_${cleanName || 'photo'}_${randomSuffix}.jpg`;

    const storageRef = ref(storage, storagePath);

    // 3. Resumable upload with progress tracking
    const uploadTask = uploadBytesResumable(storageRef, optimizedBlob, {
      contentType: 'image/jpeg',
      cacheControl: 'public,max-age=31536000',
    });

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            onProgress?.(percent);
          }
        },
        (error) => {
          console.error('Firebase Storage upload failed:', error);
          reject(new Error(`Failed to upload to Firebase Storage: ${error.message}`));
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadUrl);
          } catch (err) {
            reject(err);
          }
        }
      );
    });
  } catch (err: any) {
    console.error('uploadImageToCloud error:', err);
    throw err;
  }
}
