export async function requestCameraPermission(): Promise<boolean> {
  try {
    // Check if permissions are already granted
    const permissions = await navigator.permissions.query({
      name: "camera" as PermissionName,
    });

    if (permissions.state === "granted") {
      return true;
    }

    // Request camera access
    await navigator.mediaDevices.getUserMedia({ video: true });
    return true;
  } catch (error) {
    console.error("Camera permission error:", error);
    return false;
  }
}

export async function getCameraStream(
  facingMode: "user" | "environment" = "environment"
): Promise<MediaStream | null> {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error("Camera permission denied");
    }

    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    });
  } catch (error) {
    console.error("Camera stream error:", error);
    return null;
  }
}
