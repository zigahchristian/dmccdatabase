import React from "react";
import { Camera, User, Upload } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar2";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string, file?: File) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const fileRef = React.useRef<HTMLInputElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = React.useState(false);
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);

    // Create preview URL for display
    console.log(dataUrl);
    const dataUrl = canvas.toDataURL("image/jpeg");

    // Convert canvas to Blob/File for upload
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });
        onChange(dataUrl, file);
      }
    }, "image/jpeg");

    stopCamera();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string, file);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-row items-center gap-8 justify-center">
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <Avatar
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => fileRef.current?.click()}
          >
            <AvatarImage src={value} className="h-30" />
            <AvatarFallback>
              <User className="w-12 h-12 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Camera className="w-4 h-4" />
              Camera
            </button>
          </div>
        </>
      )}
    </div>
  );
}