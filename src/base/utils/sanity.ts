import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../services/clients/sanity-client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
