import { useState, useEffect, useRef } from 'react';

const sequenceGlobs = {
  hero1: import.meta.glob('../assets/hero-images/*', {
    eager: true,
    query: '?url',
    import: 'default'
  }),
  hero2: import.meta.glob('../assets/2-hero-images/*', {
    eager: true,
    query: '?url',
    import: 'default'
  })
};

/**
 * Custom hook to dynamic glob, sort numerically, and progressively preload an image sequence.
 * 
 * @param {'hero1' | 'hero2'} sequenceType
 * @returns {{
 *   images: HTMLImageElement[],
 *   urls: string[],
 *   loadedCount: number,
 *   totalCount: number,
 *   isLoaded: boolean,
 *   firstFrameReady: boolean
 * }}
 */
export function useImageSequence(sequenceType = 'hero1') {
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const imagesRef = useRef([]);
  const urlsRef = useRef([]);

  useEffect(() => {
    const globImports = sequenceGlobs[sequenceType] || sequenceGlobs.hero1;

    // Extract entries and sort numerically by matching numbers in filename
    const entries = Object.entries(globImports).map(([path, url]) => {
      const filename = path.split('/').pop() || '';
      const match = filename.match(/(\d+)/g);
      const frameNum = match ? parseInt(match[match.length - 1], 10) : 0;
      return { path, url, frameNum };
    });

    // Sort numerically
    entries.sort((a, b) => a.frameNum - b.frameNum);

    const sortedUrls = entries.map((entry) => entry.url);
    urlsRef.current = sortedUrls;

    const total = sortedUrls.length;
    if (total === 0) return;

    const imageObjects = new Array(total);
    imagesRef.current = imageObjects;

    let mounted = true;
    let count = 0;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        if (!sortedUrls[index]) return resolve();
        
        const img = new Image();
        img.src = sortedUrls[index];
        img.onload = () => {
          if (!mounted) return resolve();
          imageObjects[index] = img;
          count++;
          setLoadedCount(count);

          if (index === 0) {
            setFirstFrameReady(true);
          }
          if (count >= total) {
            setIsLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          if (!mounted) return resolve();
          count++;
          setLoadedCount(count);
          if (index === 0) setFirstFrameReady(true);
          if (count >= total) setIsLoaded(true);
          resolve();
        };
      });
    };

    async function startPreloading() {
      await loadImage(0);

      const priorityBatch = [];
      for (let i = 1; i < Math.min(15, total); i++) {
        priorityBatch.push(loadImage(i));
      }
      await Promise.all(priorityBatch);

      const chunkSize = 10;
      for (let i = 15; i < total; i += chunkSize) {
        if (!mounted) break;
        const chunk = [];
        for (let j = i; j < Math.min(i + chunkSize, total); j++) {
          chunk.push(loadImage(j));
        }
        await Promise.all(chunk);
      }
    }

    startPreloading();

    return () => {
      mounted = false;
    };
  }, [sequenceType]);

  return {
    images: imagesRef.current,
    urls: urlsRef.current,
    loadedCount,
    totalCount: urlsRef.current.length,
    isLoaded,
    firstFrameReady
  };
}
