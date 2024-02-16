import React from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  flexRender,
  Row,
} from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

import styles from './candidates-table.module.scss';
import clsx from 'clsx';
import { Icon } from '@/components/elements/icon';
import { useRouter } from 'next/navigation';
import { CandidateStatusChip } from '@/components/elements/candidate-status-chip/candidate-status-chip';
import { Rating } from '@/components/elements/rating/rating';

type ApplicationStatus =
  | 'applied'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'awaiting'
  | 'rejected';

export interface JobCandidate {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  stage: ApplicationStatus;
  jobApplied: string;
  appliedDate: Date;
  note: string;
}

const columnHelper = createColumnHelper<JobCandidate>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: (info) => <Rating rate={info.getValue()} />,
  }),
  columnHelper.accessor('stage', {
    header: 'Stage',
    cell: (info) => {
      const value = info.getValue();
      return <CandidateStatusChip state={value} />;
    },
  }),
  columnHelper.accessor('jobApplied', {
    header: 'Job Applied',
  }),
  columnHelper.accessor('appliedDate', {
    header: 'Applied Date',
    cell: (info) => format(info.getValue(), 'MMM dd, yyyy'),
    sortingFn: 'datetime',
  }),
  columnHelper.accessor('note', {
    header: 'Note',
    enableSorting: false,
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: () => (
      <div>
        <button>
          <Icon icon="vertical-dots" className="w-6" />
        </button>
      </div>
    ),
  }),
];

interface CandidatesTableProps {
  data: JobCandidate[];
}

export function CandidatesTable({ data }: CandidatesTableProps) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [],
    },
  });

  const renderHeaderCell = (header: Header<JobCandidate, unknown>) => {
    const isSortable = header.column.getCanSort();
    const isSorted = header.column.getIsSorted();

    return (
      <>
        {flexRender(header.column.columnDef.header, header.getContext())}

        {isSortable && (
          <div className="inline-flex flex-col flex-nowrap">
            <FontAwesomeIcon
              icon={faCaretUp}
              className={clsx(
                'h-3',
                isSorted === 'desc' ? 'text-[#ADB5BD]' : 'text-light-gray',
              )}
            />
            <FontAwesomeIcon
              icon={faCaretDown}
              className={clsx(
                '-mt-1 h-3',
                isSorted === 'asc' ? 'text-[#ADB5BD]' : 'text-light-gray',
              )}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className={styles.headerCell}>
                    {renderHeaderCell(header)}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => router.push(`/admin/candidates/${row.id}`)}
              className="cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
