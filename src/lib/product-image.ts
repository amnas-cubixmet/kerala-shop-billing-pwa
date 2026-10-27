/** Keep photos small because they live in IndexedDB and are included in JSON backups. */
export async function compressProductImage(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error('Only JPG, PNG or WebP images are supported.');
  }
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be under 5 MB.');
  const source = URL.createObjectURL(file);
  try {
    const photo = new Image();
    await new Promise<void>((resolve, reject) => {
      photo.onload = () => resolve();
      photo.onerror = () => reject(new Error('Unable to open image.'));
      photo.src = source;
    });
    if (!photo.naturalWidth || !photo.naturalHeight) throw new Error('Invalid image.');
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 256 / Math.max(photo.naturalWidth, photo.naturalHeight));
    canvas.width = Math.max(1, Math.round(photo.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(photo.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is not supported by this browser.');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(photo, 0, 0, canvas.width, canvas.height);
    let data = canvas.toDataURL('image/webp', 0.73);
    if (!data.startsWith('data:image/webp;')) data = canvas.toDataURL('image/jpeg', 0.72);
    if (data.length > 160_000) throw new Error('Compressed image is too large; choose a simpler photo.');
    return data;
  } finally {
    URL.revokeObjectURL(source);
  }
}
