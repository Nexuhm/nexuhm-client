import { PropsWithChildren, ReactNode } from 'react';

import { Button } from '@/components/elements/button';

import GoogleIcon from '@/assets/icons/google.svg';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import MicrosoftIcon from '@/assets/icons/microsoft.svg';

export function Container({ children }: PropsWithChildren) {
  return (
    <div className="max-w-lg rounded-2xl bg-white px-12 py-10 shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.05)]">
      {children}
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-2 text-[40px] font-medium leading-[48px]">{children}</h1>
  );
}

interface FormProps extends PropsWithChildren {
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

function Form({ children, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
    </form>
  );
}

function OAuthActions() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  return (
    <div className="flex flex-col gap-4">
      <Button href={`${baseUrl}/auth/linkedin`} variant="secondary" size="lg">
        <LinkedInIcon width={24} height={24} className="mr-3 text-[#00A0DC]" />
        Continue with LinkedIn
      </Button>
      <Button href={`${baseUrl}/auth/google`} variant="secondary" size="lg">
        <GoogleIcon width={24} height={24} className="mr-3" />
        Continue with Google
      </Button>
      <Button href={`${baseUrl}/auth/microsoft`} variant="secondary" size="lg">
        <MicrosoftIcon width={24} height={24} className="mr-3" />
        Continue with Microsoft
      </Button>
    </div>
  );
}

export const AuthForm = {
  Header,
  Form,
  OAuthActions,
  Container,
};
