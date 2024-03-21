import Logo from '@/assets/logo.svg';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  // if user is authorized redirect to admin page
  if(token) {
    redirect('/admin')
  }

  return (
    <main className="flex min-h-screen flex-col justify-center bg-subtle-gray py-20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Logo Column */}
        <div className="flex flex-col items-center justify-center">
          <div>
            <Logo className="mb-4" width={180} height={40} />
            <p className="text-xl text-content-primary">
              Sign in or create an account
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div>{children}</div>
      </div>
    </main>
  );
}
