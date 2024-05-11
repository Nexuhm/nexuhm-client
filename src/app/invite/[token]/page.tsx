import Logo from '@/assets/logo.svg';
import { client } from '@/base/services/clients/server-client';
import { Button } from '@/components/elements/button';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { token: string } }) {
  const res = await client.get(`/invites/${params.token}/verify`);

  if (res.invite) {
    redirect(`/signup?inviteToken=${params.token}`);
  }

  return (
    <main>
      <div className="flex justify-center py-6">
        <a href="/">
          <Logo className="h-[40px] w-[181px]" />
        </a>
      </div>

      <div className="mx-auto mt-64 max-w-lg text-center">
        <div className="mb-6 text-3xl font-semibold">
          Link is wrong or expired
        </div>
        <div className="mb-6">
          Sorry, the link you’re trying to use is either wrong or expired.
        </div>

        <Button href="/">Go to Homepage</Button>
      </div>
    </main>
  );
}
