import { client } from './clients/browser-client';

export interface UploadOptions {
  crop?: any;
  enableCropping?: boolean;
  filename?: string;
  folder?: string;
}

export class MediaService {
  static async upload(
    file: File,
    { enableCropping, crop, filename = '', folder = '' }: UploadOptions,
  ) {
    const formData = new FormData();

    formData.append('image', file);
    formData.append('filename', filename);
    formData.append('folder', folder);

    if (enableCropping) {
      formData.append('x', crop.x);
      formData.append('y', crop.y);
      formData.append('width', crop.width);
      formData.append('height', crop.height);
    }

    const res = await client.multipart('/media/upload', formData);

    if (!res.ok) {
      const message = await res.data();
      throw new Error(message);
    }

    const data = await res.json();

    return data;
  }

  static delete(url: string) {
    return client.post('/media/delete', { url });
  }
}
