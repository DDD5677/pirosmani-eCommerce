import imageCompression from "browser-image-compression";

export const changeImage = (event) => {
   let inputImage = event.target.files[0];
   const FILE_TYPE_MAP = {
      "image/png": "png",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
      "image/svg+xml": "svg",
   };
   if (!inputImage) {
      return;
   }
   if (!FILE_TYPE_MAP[inputImage.type]) {
      alert("Можно загружать только файлы jpeg, jpg, svg и png");
      return;
   }
   if (inputImage.size > 8 * 1024 * 1024) {
      alert("Размер файла должен быть меньше 10 МБ.");
      return;
   }
   return inputImage;
};

export const compressedImage = async (image) => {
   if (image.size > 1024 * 1024) {
      const options = {
         maxSizeMB: 1,
         maxWidthOrHeight: 1920,
         useWebWorker: true,
      };
      try {
         const compressedFile = await imageCompression(image, options);
         return compressedFile;
      } catch (error) {
         console.log(error);
      }
   } else {
      return image;
   }
};
