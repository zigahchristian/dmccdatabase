const compressBase64Image = (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Failed to get canvas context.");
        return;
      }

      ctx.drawImage(img, 0, 0, 300, 300);
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8); // Adjust quality if needed
      resolve(compressedBase64);
    };

    img.onerror = () => reject("Failed to load image.");
  });
};

export default compressBase64Image;
