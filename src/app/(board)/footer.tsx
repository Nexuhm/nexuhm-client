import Logo from '@/assets/logo.png';
import clsx from 'clsx';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="mt-auto">
      <div
        className={clsx(
          'container mx-auto flex max-w-xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:gap-0',
          'md:[&>a:not(:last-child)]:border-r [&>a]:inline-flex md:[&>a]:px-2',
          'items-center justify-center text-content-tertiary md:items-baseline',
        )}
      >
        <a href="/" className="order-3 items-center md:order-none">
          Powered by
          <Image
            src={Logo.src}
            width={100}
            height={23}
            className="ml-2 object-contain grayscale"
            alt=""
          />
        </a>
        <a href="">Privacy Policy</a>
        <a href="">Terms and Conditions</a>
      </div>
    </footer>
  );
}
