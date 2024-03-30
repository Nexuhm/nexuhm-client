import { MediaService } from '@/base/services/media';
import { FileUpload } from '@/components/elements/file-upload';
import { Icon } from '@/components/elements/icon';
import Image from 'next/image';
import { useState } from 'react';
import { useList } from 'react-use';

interface ImageUploaderProps {
  count?: number;
  folder?: string;
  images: string[];
  onChange: (files: string[]) => void;
}

export function ImageUploader({
  count = 1,
  folder,
  images: _images,
  onChange,
}: ImageUploaderProps) {
  const [images, { push, filter }] = useList<string>(_images);
  const [isUploading, setUploading] = useState(false);

  const handleClear = async (index: number) => {
    const image = images[index];
    await MediaService.delete(image);
    await onChange(images.filter((_, idx) => index !== index));
    filter((i) => i !== image);
  };

  const handleUpload = async (image: string) => {
    try {
      const newImages = [...images, image];
      await onChange(newImages);
      push(image);
    } catch (err) {
      console.error(err);
    }

    setUploading(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative h-[124px] w-full overflow-hidden rounded-lg border"
        >
          <button
            type="button"
            onClick={() => handleClear(index)}
            className="absolute right-1 top-1 z-10 rounded-full bg-white p-0.5"
          >
            <Icon icon="close" className="w-4" />
          </button>

          <Image src={image} className="object-cover" priority fill alt="" />
        </div>
      ))}

      {Array.from({ length: count - images.length }).map((_, index) => (
        <FileUpload
          key={index}
          folder={folder}
          accept={{ 'image/*': ['.jpeg', '.png', '.jpg', '.webp'] }}
          onComplete={(image) => handleUpload(image)}
          onStart={() => setUploading(true)}
          disabled={isUploading}
        />
      ))}
    </div>
  );
}
