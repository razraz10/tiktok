import { storage } from "@/libs/AppWrightClient";
import Image from "image-js";


const useChangeUserImage = async (
  file: File,
  cropper: any,
  currentImage: string
): Promise<string> => {
  let videoId = Math.random().toString(36).slice(2, 22);

  const x = cropper.left;  
  const y = cropper.top;
  const width = cropper.width;
  const height = cropper.height;

  try {
    const response = await fetch(URL.createObjectURL(file));
    const imageBuffer = await response.arrayBuffer();

    const image = await Image.load(imageBuffer);
    const croppedImage = image.crop({ x, y, width, height });
    const resizeImage = croppedImage.resize({ width: 200, height: 200 });
    const blob = await resizeImage.toBlob();
    const arrayBuffer = await blob.arrayBuffer();
    const finalFile = new File([arrayBuffer], file.name, { type: blob.type });
    const result = await storage.createFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      videoId,
      finalFile
    );

    if (currentImage !== String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID)) {
      await storage.deleteFile(
        String(process.env.NEXT_PUBLIC_BUCKET_ID),
        currentImage
      );
    }

    if (!result?.$id) {
      throw new Error('Failed to upload image.');
    }

    return result.$id;
    
  } catch (error) {
    console.error(error);
    throw new Error('Failed to process image.');
  }
};


export default useChangeUserImage;
