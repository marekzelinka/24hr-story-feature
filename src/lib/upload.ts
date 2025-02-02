const MIN_IMAGE_WIDTH = 1000;
const MIN_IMAGE_HEIGHT = 1920;

const IMAGE_COMPRESSION_QUALITY = 0.9;

/**
 * Returns a image data URL.
 * @param {File} file - The uploaded file.
 * @returns {Promise<string>} Data URL containing a representation of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string> {
  const image = new Image();
  const imageUrl = await new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(event.target?.result as string);
    fileReader.readAsDataURL(file);
  });
  image.src = imageUrl;
  await new Promise((resolve) => (image.onload = resolve));

  let returnedImageUrl = imageUrl;
  if (image.width > MIN_IMAGE_WIDTH || image.height > MIN_IMAGE_HEIGHT) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const ratio = Math.min(
      MIN_IMAGE_WIDTH / image.width,
      MIN_IMAGE_HEIGHT / image.height,
    );
    canvas.width = image.width * ratio;
    canvas.height = image.height * ratio;
    context?.drawImage(image, 0, 0, canvas.width, canvas.height);
    returnedImageUrl = canvas.toDataURL(
      "image/jpeg",
      IMAGE_COMPRESSION_QUALITY,
    );
  }

  return returnedImageUrl;
}
