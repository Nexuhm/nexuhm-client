import clsx from 'clsx';
import { client } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Spinner } from '@/components/elements/spinner';

function CompanyLogoUploader({ onUpload }: { onUpload: (file: File) => void }) {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'image/png': ['png'],
      'image/webp': ['webp'],
      'image/jpeg': ['jpeg', 'jpg'],
    },
    onDrop: (files) => {
      onUpload(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'h-[300px] w-[300px] rounded-lg border border-dashed bg-surface-primary p-10',
        'flex items-center justify-center transition-all',
        'cursor-pointer hover:bg-surface-secondary',
      )}
    >
      <input {...getInputProps()} />
      <div className="max-w-[200px] text-center  font-medium text-content-secondary">
        <span className="text-blue">Drop your image</span> or click to browse
      </div>
    </div>
  );
}

function CompanyLogoCropper({
  image,
  loading,
  onCrop,
  onDelete,
}: {
  image: string;
  loading: boolean;
  onCrop: (area: any) => void;
  onDelete: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [area, setArea] = useState<any>();

  const handleCropComplete = (_: any, croppedAreaPixels: any) => {
    setArea(croppedAreaPixels);
  };

  return (
    <div>
      <div className="relative mb-4 h-[300px] w-[300px] overflow-hidden rounded-lg">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          objectFit="contain"
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
          cropShape={'rect'}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={() => setAspect(aspect === 1 ? 2 : 1)}>
          Switch to {aspect === 1 ? 'square' : 'rect'}
        </Button>
        <Button onClick={() => onCrop(area)} className="w-full">
          Save
          {loading && <Spinner color="white" size={15} className="ml-2" />}
        </Button>
        <Button onClick={onDelete} className="w-full" variant="secondary">
          Delete <FontAwesomeIcon icon={faTrashAlt} className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export function CompanyLogoUploadDialog({
  open,
  onClose,
  onImageChange,
}: {
  open: boolean;
  onImageChange: (url: string) => void;
  onClose: () => void;
}) {
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const handleCrop = async (area: any) => {
    if (!file) {
      return null;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('enableCropping', '1');
      formData.append('image', file);
      formData.append('x', area.x);
      formData.append('y', area.y);
      formData.append('width', area.width);
      formData.append('height', area.height);

      const res = await client.multipart('/media/upload', formData);

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }

      const data = await res.json();

      onImageChange(data.url);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (file: File) => {
    // Create a URL for the file
    const fileSrc = URL.createObjectURL(file);
    setImage(fileSrc);
    setFile(file);

    // Cleanup function to revoke the created URL to avoid memory leaks
    return () => URL.revokeObjectURL(fileSrc);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className={clsx(
          'fixed left-0 top-0 h-screen w-full bg-black bg-opacity-15',
          'flex items-center justify-center',
        )}
      >
        <Dialog.Panel className="rounded-lg bg-white p-6">
          {image ? (
            <CompanyLogoCropper
              image={image}
              loading={loading}
              onCrop={handleCrop}
              onDelete={() => setImage(undefined)}
            />
          ) : (
            <CompanyLogoUploader onUpload={handleUpload} />
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
