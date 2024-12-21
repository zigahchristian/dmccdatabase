import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { getCameraStream } from "./cameraPermission";

interface MediaUploadProps {
  onFileSelect: (file: File) => void;
}

const MediaUpload = ({ onFileSelect }: MediaUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Request camera permission on component mount for Android
  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) {
      getCameraStream().then((stream) => {
        if (stream) {
          // Immediately stop the stream since we just want the permission
          stream.getTracks().forEach((track) => track.stop());
        }
      });
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onFileSelect(file);
        setError(null);
      } else {
        setError("Please select an image file");
      }
    }
  };

  const startCamera = async () => {
    const stream = await getCameraStream();
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      setError(null);
    } else {
      setError("Could not access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", {
              type: "image/jpeg",
            });
            setPreview(canvas.toDataURL("image/jpeg"));
            onFileSelect(file);

            // Stop camera stream
            const stream = videoRef.current?.srcObject as MediaStream;
            stream?.getTracks().forEach((track) => track.stop());
            if (videoRef.current) {
              videoRef.current.srcObject = null;
            }
          }
        }, "image/jpeg");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full rounded-lg ${
            !videoRef.current?.srcObject ? "hidden" : ""
          }`}
        />

        {preview && !videoRef.current?.srcObject && (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full rounded-lg" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} />
          Upload
        </button>

        {!videoRef.current?.srcObject ? (
          <button
            onClick={startCamera}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Camera size={20} />
            Camera
          </button>
        ) : (
          <button
            onClick={capturePhoto}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <ImageIcon size={20} />
            Capture
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        capture="environment"
      />
    </div>
  );
};

export default MediaUpload;
