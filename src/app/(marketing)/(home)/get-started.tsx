import { Button } from '@/components/elements/button';
import Link from 'next/link';

export function GetStartedSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="mx-auto mb-12 text-center md:mb-20">
          <h2 className="mb-6 text-4xl font-medium md:text-6xl">
            Get Started With Nexuhm Today
          </h2>

          <p className="mb-6 text-xl">
            Play around with it first. Pay and add your team later.
          </p>

          <Button size="lg" href="/signup">
            Start now
          </Button>
        </div>

        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="mx-auto max-w-sm text-center md:ml-0 md:text-left">
            At Nexuhm, we believe in making recruitment efficient, effective,
            and empowering. Join us in transforming the world of hiring.
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-baseline md:gap-16">
            <div className="text-center md:text-left">
              <div className="mb-4 text-lg md:mb-6">Resources</div>

              <ul>
                <li>
                  <Link href="/privacy-policy" className="text-blue">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <div className="mb-4 text-lg md:mb-6">About</div>

              <ul>
                <li>
                  <Link href="/contact-us" className="text-blue">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
