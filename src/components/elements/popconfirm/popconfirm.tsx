import {
  ElementType,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useToggle } from 'react-use';
import { Dialog } from '../dialog';
import { Button, ButtonVariant } from '../button';

export interface PopconfirmProps {
  onConfirm: () => void;
  onReject?: () => void;
  children: ReactNode | (({ open, toggle }: any) => ReactNode);
}

interface PopconfirmState {
  open: boolean;
  toggle: (open?: boolean) => void;
  onConfirm?: () => void;
  onReject?: () => void;
}

const PopconfirmContext = createContext<PopconfirmState>({
  open: false,
  toggle: () => {},
});

function usePopconfirmContext() {
  return useContext(PopconfirmContext);
}

export function Popconfirm({ children, onConfirm, onReject }: PopconfirmProps) {
  const [open, toggle] = useToggle(false);

  return (
    <PopconfirmContext.Provider value={{ open, toggle, onConfirm, onReject }}>
      {children instanceof Function ? children({ open, toggle }) : children}
    </PopconfirmContext.Provider>
  );
}

interface PopconfirmButtonProps {
  as?: ElementType<any>;
  children: ReactNode;
}

function PopconfirmButton({
  as = 'button',
  children,
  ...props
}: PopconfirmButtonProps & any) {
  const ctx = usePopconfirmContext();
  const Tag = as;

  return (
    <Tag onClick={ctx.toggle} {...props}>
      {children}
    </Tag>
  );
}

function PopconfirmDialog({ children }: PopconfirmButtonProps) {
  const ctx = usePopconfirmContext();

  return (
    <Dialog open={ctx.open} onClose={() => ctx.toggle(false)}>
      {children}
    </Dialog>
  );
}

function PopconfirmConfirmAction({
  children,
  variant = 'primary',
}: {
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  const ctx = usePopconfirmContext();

  const handleClick = () => {
    if (ctx.onConfirm) {
      ctx.onConfirm();
    }

    ctx.toggle(false);
  };

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function PopconfirmCancelAction({
  children = 'Cancel',
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
}) {
  const ctx = usePopconfirmContext();

  return (
    <Button variant="link" type="button" onClick={() => ctx.toggle(false)}>
      {children}
    </Button>
  );
}

Popconfirm.Button = PopconfirmButton;
Popconfirm.Dialog = PopconfirmDialog;
Popconfirm.ConfirmAction = PopconfirmConfirmAction;
Popconfirm.CancelAction = PopconfirmCancelAction;
