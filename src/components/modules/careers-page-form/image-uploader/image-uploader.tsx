import { FileUpload } from '@/components/elements/file-upload';
import { useEffect } from 'react';
import { useList } from 'react-use';

interface ImageUploaderProps {
  count?: number;
  onUpload: (files: File[]) => void;
}

export function ImageUploader({ count = 1, onUpload }: ImageUploaderProps) {
  const [files, { updateAt, removeAt }] = useList<File>([]);

  useEffect(() => {
    if (files.length && onUpload) {
      onUpload(files);
    }
  }, [onUpload]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <FileUpload
          key={index}
          accept={{ 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] }}
          value={files[index]}
          onUpload={(file) => updateAt(index, file)}
          onClear={() => removeAt(index)}
        />
      ))}
    </div>
  );
}
