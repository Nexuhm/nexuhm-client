import { Button } from '@/components/elements/button';
import { Divider } from '@/components/elements/divider';
import { Input } from '@/components/elements/input/input';

import GoogleIcon from '@/assets/icons/google.svg';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import MicrosoftIcon from '@/assets/icons/microsoft.svg';

export default function SignUpPage() {
  return (
    <div className="max-w-lg px-12 bg-white py-10 rounded-2xl shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.05)]">
      <div className="mb-10">
        <p className="text-[40px] font-medium leading-[48px] mb-2">Sign up</p>
        <p>
          Already have an account?
          <a href="/login" className="text-blue mx-1">
            Sign In
          </a>
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <Input id="firstname" label="Firstname" placeholder="Your firstname" />

        <Input id="lastname" label="Lastname" placeholder="Your lastname" />

        <Input
          id="email"
          label="Email address"
          placeholder="Your email address"
        />

        <Input id="password" label="Password" placeholder="Your password" />

        <div>
          <a href="" className="text-blue">
            Forgot password?
          </a>
        </div>

        <Button>Sign Up</Button>
      </form>

      <Divider className="my-6">Or</Divider>

      <div className="flex flex-col gap-4">
        <Button variant="secondary">
          <LinkedInIcon
            width={24}
            height={24}
            className="mr-3 text-[#00A0DC]"
          />
          Continue with Linkedin
        </Button>
        <Button variant="secondary">
          <GoogleIcon width={24} height={24} className="mr-3" />
          Continue with Google
        </Button>
        <Button variant="secondary">
          <MicrosoftIcon width={24} height={24} className="mr-3" />
          Continue with Microsot
        </Button>
      </div>
    </div>
  );
}
