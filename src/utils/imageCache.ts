import {Image} from 'react-native';

type CacheEntry = {
  timestamp: number;
  dimensions: {width: number; height: number};
};

const imageCache = new Map<string, CacheEntry>();
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const prefetchImage = async (uri: string): Promise<void> => {
  if (!uri) {
    console.warn('Empty URI provided to prefetchImage');
    return;
  }

  try {
    const {width, height} = await Image.getSize(uri);
    imageCache.set(uri, {
      timestamp: Date.now(),
      dimensions: {width, height},
    });
    await Image.prefetch(uri);
  } catch (error) {
    console.error('Error prefetching image:', error);
  }
};

export const getImageDimensions = (uri: string) => {
  if (!uri) {
    return null;
  }

  const cached = imageCache.get(uri);
  if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
    return cached.dimensions;
  }
  return null;
};

export const clearOldCache = () => {
  const now = Date.now();
  for (const [uri, entry] of imageCache.entries()) {
    if (now - entry.timestamp > CACHE_TIMEOUT) {
      imageCache.delete(uri);
    }
  }
};
