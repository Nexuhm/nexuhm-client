import Image from 'next/image';
import { Accept, useDropzone } from 'react-dropzone';
import { useFileToImage } from '@/base/hooks/use-file-to-image';
import { Icon } from '../icon';

interface FileUploadProps {
  value?: File;
  accept?: Accept;
  onUpload: (files: File) => void;
  onClear: () => void;
}

export function FileUpload({
  accept,
  value,
  onClear,
  onUpload,
}: FileUploadProps) {
  const src = useFileToImage(value);
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept,
    onDrop: (files) => onUpload(files[0]),
  });

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.files = null;
    }

    onClear();
  };

  return (
    <div
      {...getRootProps()}
      className="h-[124px] cursor-pointer overflow-hidden rounded-lg border"
    >
      <input {...getInputProps()} />

      {src ? (
        <div className="relative h-full w-full">
          <button
            onClick={handleClear}
            className="absolute right-1 top-1 z-10 rounded-full bg-white p-0.5"
          >
            <Icon icon="close" className="w-4" />
          </button>
          <Image src={src} fill alt="" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center px-5">
          <div className="text-center text-content-tertiary">
            <span className="mr-1.5 font-medium text-blue">
              Click to upload
            </span>
            or drag and drop
          </div>
        </div>
      )}
    </div>
  );
}
