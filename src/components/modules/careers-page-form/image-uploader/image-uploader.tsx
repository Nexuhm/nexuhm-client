import { MediaService } from '@/base/services/media';
import { FileUpload } from '@/components/elements/file-upload';
import { Icon } from '@/components/elements/icon';
import Image from 'next/image';
import { useEffect } from 'react';
import { useList } from 'react-use';

interface ImageUploaderProps {
  count?: number;
  folder?: string;
  images: string[];
  onUpload: (files: string[]) => void;
}

export function ImageUploader({
  count = 1,
  folder,
  images: _images,
  onUpload,
}: ImageUploaderProps) {
  const [images, { push, filter }] = useList<string>(_images);

  const handleClear = async (index: number) => {
    const image = images[index];
    await MediaService.delete(image);
    filter((i) => i !== image);
  };

  const handleUpload = async (image: string) => {
    const newImages = [...images, image];
    await onUpload(newImages);
    push(image);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative h-[124px] w-full overflow-hidden rounded-lg border"
        >
          <button
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
          onUpload={(image) => handleUpload(image)}
        />
      ))}
    </div>
  );
}
