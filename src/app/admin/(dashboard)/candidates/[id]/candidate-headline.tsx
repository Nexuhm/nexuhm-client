'use client';

import { useState } from 'react';
import { Button, IconButton } from '@/components/elements/button';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@/components/elements/dropdown';
import { Dialog } from '@/components/elements/dialog';
import { RecruitmentStage } from '@/base/types/candidates';
import { client } from '@/base/services/clients/browser-client';
import styles from './candidates.module.scss';
import { Icon } from '@/components/elements/icon';

interface CandidateHeadlineProps {
  candidateId: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  profession: string;
  stage?: RecruitmentStage;
}

export function CandidateHeadline({
  candidateId,
  firstname,
  lastname,
  phone,
  email,
  profession,
  stage,
}: CandidateHeadlineProps) {
  const isRejected = stage === 'rejected';
  const [rejectDialog, setRejectDialog] = useState(false);

  const handleReject = async () => {
    await client.post(`/admin/candidates/${candidateId}/reject`);
    location.reload();
  };

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

        <Dropdown>
          <Dropdown.Button
            as={IconButton}
            variant="secondary"
            icon="vertical-dots"
          />
          <Dropdown.Content>
            <Button
              disabled={isRejected}
              onClick={() => setRejectDialog(true)}
              className="w-40"
              variant="link"
            >
              Reject Candidate
            </Button>
          </Dropdown.Content>
        </Dropdown>

        <RejectDialog
          open={rejectDialog}
          onClose={() => setRejectDialog(false)}
          onConfirm={() => handleReject()}
        />
      </div>
    </div>
  );
}

function RejectDialog({ open, onClose, onConfirm }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>Reject Candidate</Dialog.Title>
      <Dialog.Content className="max-w-md">
        Are you sure you want to reject Malaika Brown? This action cannot be
        undone.
      </Dialog.Content>
      <Dialog.Actions>
        <Button variant="link">Cancel</Button>
        <Button variant="alert" onClick={onConfirm}>
          Reject Candidate
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
