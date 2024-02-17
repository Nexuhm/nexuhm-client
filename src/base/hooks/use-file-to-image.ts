import { useEffect, useState } from 'react';

export function useFileToImage(file?: File) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (file) {
      // Create a URL for the file
      const fileSrc = URL.createObjectURL(file);
      setSrc(fileSrc);

      // Cleanup function to revoke the created URL to avoid memory leaks
      return () => URL.revokeObjectURL(fileSrc);
    } else {
      setSrc(undefined);
    }
  }, [file]);

  return src;
}
