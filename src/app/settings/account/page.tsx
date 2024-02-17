import { ProfileImageForm } from '@/components/modules/profile-image-form';
import { AccountDetailsUpdateForm } from '@/components/modules/account-update-form';

export default function AccountPage() {
  return (
    <div className="container max-w-2xl pb-20">
      <h1 className="mb-6 text-2xl">Account</h1>
      <AccountDetailsUpdateForm />
      <ProfileImageForm />
    </div>
  );
}
