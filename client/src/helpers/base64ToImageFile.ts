/**
 * Converts a Base64 string to a File object.
 * @param base64 - The Base64 string, including the data URL prefix (e.g., "data:image/png;base64,...").
 * @param fileName - The name of the output file.
 * @returns A File object.
 */
const base64ToImageFile = (
  base64: string | undefined,
  fileName: string
): File => {
  // Split the Base64 string into metadata and data parts
  const [metadata, data] = base64.split(",");

  // Extract the MIME type from the metadata
  const mimeMatch = metadata.match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid Base64 string");
  }
  const mimeType: string = mimeMatch[1];

  // Decode the Base64 string into a binary array
  const binaryString = atob(data);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  // Create a File object using the decoded data
  return new File([byteArray], fileName, { type: mimeType });
};

export default base64ToImageFile;
