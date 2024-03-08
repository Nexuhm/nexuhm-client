import { IconButton } from '@/components/elements/button';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './candidates.module.scss';

interface CandidateHeadlineProps {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  profession: string;
}

export function CandidateHeadline({
  firstname,
  lastname,
  phone,
  email,
  profession,
}: CandidateHeadlineProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <div className="mb-1 text-2xl">
          {firstname} {lastname}
        </div>
        <div className={styles.details}>
          {profession && <span>{profession}</span>}

          {phone && (
            <a href="" className="inline-flex items-center gap-1">
              <FontAwesomeIcon icon={faPhone} className="w-4" />
              {phone}
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1"
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4" />
              {email}
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <IconButton icon="envelope" variant="secondary" />
        <IconButton icon="vertical-dots" variant="secondary" />
      </div>
    </div>
  );
}
