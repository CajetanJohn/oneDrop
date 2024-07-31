import * as FileSystem from 'expo-file-system';

export const useFileSystemInfo = () => {
  const createFolder = async (folderName) => {
    try {
      const folderUri = `${FileSystem.documentDirectory}${folderName}/`;
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
      return folderUri;
    } catch (error) {
      console.error('Error creating folder:', error);
      return null;
    }
  };

  return { createFolder };
};
