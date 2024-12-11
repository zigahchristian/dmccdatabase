import React from "react";
import { Camera, User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compressImage, dataURLtoFile } from "../../helpers/imageutil";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  maxSizeKB?: number;
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  maxSizeKB = 1024,
}: ImageUploadProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [error, setError] = React.useState<string>("");

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
      setError("");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError(
        "Unable to access camera. Please ensure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");

    try {
      const file = dataURLtoFile(dataUrl, "camera-capture.jpg");
      const compressedFile = await compressImage(file, maxSizeKB);

      // Create preview URL for display
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);

      stopCamera();
      setError("");
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Error processing image. Please try again.");
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    try {
      const compressedFile = await compressImage(file, maxSizeKB);

      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);

      setError("");
    } catch (error) {
      console.error("Error processing image:", error);
      setError("Error processing image. Please try again.");
    }
  };

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {showCamera ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg w-[300px] h-[225px] bg-gray-100"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <button
              type="button"
              onClick={capturePhoto}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <Avatar
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => !disabled && fileRef.current?.click()}
          >
            <AvatarImage src={value} className="h-30" />
            <AvatarFallback>
              <User className="w-12 h-12 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => !disabled && fileRef.current?.click()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              disabled={disabled}
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
              disabled={disabled}
            >
              <Camera className="w-4 h-4" />
              Camera
            </button>
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
