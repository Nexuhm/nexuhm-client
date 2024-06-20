import { ReactNode } from 'react';
import BoardLayout from '../board-layout';

export default async function JobBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BoardLayout>{children}</BoardLayout>;
}
