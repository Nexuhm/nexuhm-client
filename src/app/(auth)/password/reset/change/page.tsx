import { ErrorMessage } from '@/components/elements/error-message';
import { PasswordResetForm } from './password-reset-form';
import { validateToken } from '@/base/actions/auth';

export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const { isValid } = await validateToken(searchParams.token);

  if (!isValid) {
    return (
      <div className="max-w-lg p-10 card-container">
        <ErrorMessage>
          <div className="text-center font-medium">
            Token is expired or invalid
          </div>
          <div className="text-center">
            <a href="/login" className="text-blue">
              Return to sign in
            </a>
          </div>
        </ErrorMessage>
      </div>
    );
  }

  return <PasswordResetForm token={searchParams.token} />;
}
