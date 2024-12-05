export async function compressImage(
  file: File,
  maxSizeKB: number = 1024
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio while resizing
        if (width > height) {
          if (width > 1200) {
            height = Math.round((height * 300) / width);
            width = 300;
          }
        } else {
          if (height > 1200) {
            width = Math.round((width * 300) / height);
            height = 300;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Start with high quality
        let quality = 0.9;
        let output = canvas.toDataURL("image/jpeg", quality);

        // Reduce quality until file size is under maxSizeKB
        while (output.length > maxSizeKB * 1024 && quality > 0.1) {
          quality -= 0.1;
          output = canvas.toDataURL("image/jpeg", quality);
        }

        // Convert base64 to File
        const byteString = atob(output.split(",")[1]);
        const mimeString = output.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const compressedFile = new File([ab], file.name, {
          type: mimeString,
          lastModified: Date.now(),
        });

        resolve(compressedFile);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
