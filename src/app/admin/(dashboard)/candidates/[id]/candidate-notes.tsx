'use client';

import { client } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { format, parseJSON } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetState } from 'react-use';
import clsx from 'clsx';
import { Dialog } from '@headlessui/react';
import { Textarea } from '@/components/elements/input';
import { useForm } from 'react-hook-form';

interface CandidateNotesState {
  notes: CandidateNoteProps[];
}

export function CandidateNotes() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [state, setState] = useSetState<CandidateNotesState>({
    notes: [],
  });

  const fetchNotes = async () => {
    const notes = await client.get(`/admin/candidates/${params.id}/notes`);
    setState({ notes });
  };

  const handleCreateNote = async (content: string) => {
    const note = await client.post(`/admin/candidates/${params.id}/notes`, {
      note: content,
    });

    setState({
      notes: [note, ...state.notes],
    });

    setOpen(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center text-xl font-semibold">
          Notes
          {state.notes.length > 0 && (
            <span
              className={clsx(
                'ml-3 h-10 w-10',
                'rounded-full bg-subtle-gray',
                'inline-flex items-center justify-center',
                'text-lg text-content-secondary',
              )}
            >
              {state.notes.length}
            </span>
          )}
        </div>

        <Button
          variant="secondary"
          className="inline-flex items-center"
          onClick={() => setOpen(true)}
        >
          <Icon icon="plus" className="mr-2 w-5" />
          Add Note
        </Button>
      </div>

      <div className="scrollbar-light-blue flex max-h-[570px] flex-col gap-4 overflow-auto">
        {state.notes.map(({ author, createdAt, note }, index) => (
          <Note key={index} author={author} createdAt={createdAt} note={note} />
        ))}
      </div>

      <CandidateNoteDialog
        open={open}
        onSubmit={handleCreateNote}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

interface CandidateNoteProps {
  author: string;
  createdAt: string;
  note: string;
}

function Note({ author, createdAt, note }: CandidateNoteProps) {
  return (
    <div className="rounded-xl border p-4 transition-all hover:bg-subtle-gray">
      <div className="flex items-center justify-between pb-4 font-medium">
        <div>{author}</div>
        <div>{format(parseJSON(createdAt), 'MMM dd, hh:MM aa')}</div>
      </div>

      <div className="text-content-secondary">{note}</div>
    </div>
  );
}

function CandidateNoteDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ note: string }>();

  const submitHandler = async (values: { note: string }) => {
    await onSubmit(values.note);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsx(
        'fixed left-0 top-0 z-10',
        'h-screen w-screen bg-content-primary bg-opacity-25',
        'flex items-center justify-center',
      )}
    >
      <Dialog.Panel className="w-full max-w-sm bg-white p-4 card-container">
        <div className="mb-3 text-xl font-semibold">Add note</div>

        <div>
          <div className="mb-6 max-h-[300px] overflow-auto">
            <Textarea
              label="Note"
              rows={5}
              {...register('note')}
              placeholder="Notes can be seen by other team members."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="link" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(submitHandler)}
              loading={isSubmitting}
            >
              Add Note
            </Button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
