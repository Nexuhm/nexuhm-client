import { Button } from '@/components/elements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';

export function FollowCompany() {
  return (
    <div className="flex">
      <div className="mb-20 ml-auto flex gap-4">
        <Button variant="secondary" className="!text-blue">
          Follow Company on{' '}
          <FontAwesomeIcon className="ml-2 w-4" icon={faTwitter} />
        </Button>

        <Button variant="secondary" className="!w-[40px] !px-0 !text-blue">
          <FontAwesomeIcon className="w-4" icon={faFacebook} />
        </Button>

        <Button variant="secondary" className="!w-[40px] !px-0 !text-blue">
          <FontAwesomeIcon className="w-4" icon={faLinkedinIn} />
        </Button>
      </div>
    </div>
  );
}
