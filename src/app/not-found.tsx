import Logo from '@/assets/logo.svg';
import { Button } from '@/components/elements/button';

export default function NotFound() {
  return (
    <main>
      <div className="flex justify-center py-6">
        <a href="/">
          <Logo className="h-[40px] w-[181px]" />
        </a>
      </div>

      <div className="mx-auto mt-64 max-w-lg text-center">
        <div className="font-inter text-[80px] font-semibold">404</div>
        <div className="mb-6 text-3xl">Hmm, this page doesn’t exist</div>
        <div className="mb-6">
          Sorry, the page you’re looking for isn’t here. This can happen because
          of typos in the web address or outdated links.
        </div>

        <Button href="/">Go to Homepage</Button>
      </div>
    </main>
  );
}
