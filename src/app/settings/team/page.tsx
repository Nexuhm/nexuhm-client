'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { Avatar } from '@/components/elements/avatar';
import { Button } from '@/components/elements/button';
import { InviteFormDialog, InviteFormValues } from './invite-form-dialog';
import { client } from '@/base/services/clients/browser-client';
import { useUserData } from '@/base/hooks/use-user-data';
import { Popconfirm } from '@/components/elements/popconfirm';
import { Dialog } from '@/components/elements/dialog';

export default function TeamPage() {
  const { data: user } = useUserData();
  const [InviteDialogState, setInviteDialogState] = useState(false);
  const { data, isLoading, mutate } = useSWR(
    user ? `/team/${user.company}` : null,
    (url) => client.get(url),
  );

  const handleInvite = async (val: InviteFormValues) => {
    await client.post('/invites', {
      ...val,
      company: user!.company,
    });

    mutate();
    setInviteDialogState(false);
  };

  const handleRemoveMember = async (id: string) => {
    await client.post(`/team/${user?.company}/members/${id}/remove`);
    mutate();
  };

  const handleRevokeInvite = async (id: string) => {
    await client.post(`/invites/${id}/revoke`);
    mutate();
  };

  return (
    <>
      <div className="container max-w-2xl pb-20">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl">Teams</h1>
          <Button onClick={() => setInviteDialogState(true)}>Add Member</Button>
        </div>

        {!isLoading && data && (
          <>
            <MembersList items={data.members} onRemove={handleRemoveMember} />
            <InvitesList items={data.invites} onRevoke={handleRevokeInvite} />
          </>
        )}
      </div>

      <InviteFormDialog
        open={InviteDialogState}
        onClose={() => setInviteDialogState(false)}
        onInvite={handleInvite}
      />
    </>
  );
}

interface MemberProps {
  name: string;
  image: string;
  roles: string[];
  email: string;
}

function MembersList({
  items = [],
  onRemove,
}: {
  items: MemberProps[];
  onRemove: (id: string) => void;
}) {
  const { data } = useUserData();

  return (
    <div className="mb-10">
      <div className="mb-6">{items?.length} Members</div>

      <div className="card-container">
        {items.map((item: any) => (
          <div key={item.email} className="flex items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar name={item.name} image={item.picture} />
              <span>{item.name}</span>
              <span className="text-sm text-content-secondary">
                {item.roles?.join(', ')}
              </span>
            </div>

            {item.id !== data?.id && (
              <div className="ml-auto">
                <Popconfirm onConfirm={() => onRemove(item.id)}>
                  <Popconfirm.Button as={Button} size="xs" variant="alert">
                    Remove
                  </Popconfirm.Button>

                  <Popconfirm.Dialog>
                    <Dialog.Title>Remove Member</Dialog.Title>

                    <Dialog.Content className="max-w-sm">
                      <p className="mb-2">
                        You are going to remove member for{' '}
                        <strong className="font-semibold">{item.email}</strong>.
                      </p>

                      <p className="mb-2">
                        This will remove user's access to the company.
                      </p>

                      <p>Are you sure?</p>
                    </Dialog.Content>

                    <Dialog.Actions>
                      <Popconfirm.CancelAction />
                      <Popconfirm.ConfirmAction variant="alert">
                        Yes, remove
                      </Popconfirm.ConfirmAction>
                    </Dialog.Actions>
                  </Popconfirm.Dialog>
                </Popconfirm>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface InviteProps {
  id: string;
  email: string;
  role: string;
}

function InvitesList({
  items = [],
  onRevoke,
}: {
  items: InviteProps[];
  onRevoke: (id: string) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="mb-6">{items?.length} Invites</div>

      <div className="card-container">
        {items.map((item) => (
          <div className="flex items-center px-6 py-4">
            <div className="flex items-center gap-4">
              <Avatar name={item.email} />
              <span>{item.email}</span>
              <span className="text-sm text-content-secondary">
                {item.role}
              </span>
            </div>

            <div className="ml-auto">
              <Popconfirm onConfirm={() => onRevoke(item.id)}>
                <Popconfirm.Button as={Button} size="xs" variant="alert">
                  Revoke
                </Popconfirm.Button>

                <Popconfirm.Dialog>
                  <Dialog.Title>Revoke Invite</Dialog.Title>

                  <Dialog.Content className="max-w-xs">
                    <p className="mb-2">
                      You are going to revoke invite for{' '}
                      <strong className="font-semibold">{item.email}</strong>.
                    </p>
                    <p>Are you sure?</p>
                  </Dialog.Content>

                  <Dialog.Actions>
                    <Popconfirm.CancelAction />
                    <Popconfirm.ConfirmAction variant="alert">
                      Yes, revoke invite
                    </Popconfirm.ConfirmAction>
                  </Dialog.Actions>
                </Popconfirm.Dialog>
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
