import { Button } from '@/components/elements/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faFacebook,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';

export type SocialPlatform = 'linkedin' | 'twitter' | 'facebook';

interface SocialLink {
  type: SocialPlatform;
  href?: string;
}

interface FollowCompanyProps {
  links?: Record<SocialPlatform, string>;
}

export function FollowCompany({ links }: FollowCompanyProps) {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return faLinkedinIn;
      case 'twitter':
        return faTwitter;
      case 'facebook':
        return faFacebook;
    }
  };

  return (
    <div className="mb-10 ml-auto flex justify-end gap-2">
      {Object.keys(links || {})?.map((key, index) => {
        const icon = getSocialIcon(key);
        const href = links?.[key as SocialPlatform];

        if (!href) return null;

        return (
          <Button
            target="_blank"
            href={href}
            variant="secondary"
            className={clsx('!text-blue', index > 0 ? '!w-10 !px-0' : '')}
          >
            {index === 0 ? <span className="mr-2">Follow Company on</span> : ''}
            {icon && <FontAwesomeIcon className="w-4" icon={icon} />}
          </Button>
        );
      })}
    </div>
  );
}
