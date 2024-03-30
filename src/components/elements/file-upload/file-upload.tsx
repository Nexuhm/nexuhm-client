import clsx from 'clsx';
import { Accept, useDropzone } from 'react-dropzone';
import { useSetState } from 'react-use';
import { MediaService } from '@/base/services/media';
import { Spinner } from '../spinner';

interface FileUploadProps {
  accept?: Accept;
  folder?: string;
  disabled?: boolean;
  onStart: () => void;
  onComplete: (image: string) => void;
}

export function FileUpload({
  accept,
  disabled,
  folder,
  onStart,
  onComplete,
}: FileUploadProps) {
  const [state, setState] = useSetState({
    isDragged: false,
    isUploading: false,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    disabled,
    onDrop: async (files) => {
      onStart();

      setState({
        isDragged: false,
        isUploading: true,
      });

      const data = await MediaService.upload(files[0], {
        folder,
      });

      onComplete(data.url);

      setState({ isUploading: false });
    },
    onDragEnter: () => {
      setState({ isDragged: true });
    },
    onDragLeave: () => {
      setState({ isDragged: false });
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'h-[124px] cursor-pointer overflow-hidden rounded-lg border transition-all hover:bg-surface-secondary',
        state.isDragged && 'animate-pulse border-dashed  bg-surface-secondary',
        disabled && 'bg-gray-500 bg-opacity-15',
      )}
    >
      <input {...getInputProps()} />

      <div className="flex h-full w-full items-center justify-center px-5">
        {state.isUploading ? (
          <Spinner size={30} color="#006EDF" />
        ) : (
          <div className="text-center text-content-tertiary">
            <span className="mr-1.5 font-medium text-blue">
              Click to upload
            </span>
            or drag and drop
          </div>
        )}
      </div>
    </div>
  );
}
