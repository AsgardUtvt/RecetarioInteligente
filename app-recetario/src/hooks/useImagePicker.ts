import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const [image64, setImage64] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],   // <-- ASÍ, no ImagePicker.MediaType.Images
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  return { image64, pickImage };
};
