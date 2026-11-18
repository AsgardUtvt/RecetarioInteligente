import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const [image64, setImage64] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      // Guardamos con el prefijo para que el <Image> de RN lo renderice directo
      setImage64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const clearImage = () => setImage64(null);

  return { image64, pickImage, clearImage, setImage64 };
};
