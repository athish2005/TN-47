/**
 * Draws an Image onto an HTML5 Canvas context using object-fit: cover logic.
 * Ensures the image is never distorted or stretched and fills the target dimensions.
 * Handles High-DPI (Retina) scaling and custom focal points.
 *
 * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context
 * @param {HTMLImageElement} img - Preloaded Image object
 * @param {number} width - Canvas display width in CSS pixels
 * @param {number} height - Canvas display height in CSS pixels
 * @param {number} dpr - Device Pixel Ratio (window.devicePixelRatio)
 * @param {Object} options - Custom configuration (e.g. alignment)
 */
export function drawImageCover(ctx, img, width, height, dpr = 1, options = {}) {
  if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;

  const { alignX = 0.5, alignY = 0.5 } = options;

  // Calculate actual physical pixel canvas dimensions
  const renderWidth = width * dpr;
  const renderHeight = height * dpr;

  // Ensure canvas internal size matches physical device pixels for maximum crispness
  if (ctx.canvas.width !== renderWidth || ctx.canvas.height !== renderHeight) {
    ctx.canvas.width = renderWidth;
    ctx.canvas.height = renderHeight;
  }

  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;

  // Compute cover scale factor
  const scale = Math.max(renderWidth / imgWidth, renderHeight / imgHeight);

  // Scaled dimensions
  const drawWidth = imgWidth * scale;
  const drawHeight = imgHeight * scale;

  // Calculate top-left offsets based on alignment focal point
  const offsetX = (renderWidth - drawWidth) * alignX;
  const offsetY = (renderHeight - drawHeight) * alignY;

  // Smooth rendering parameters
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Clear previous frame
  ctx.clearRect(0, 0, renderWidth, renderHeight);

  // Draw scaled image
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
