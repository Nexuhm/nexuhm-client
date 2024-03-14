'use client';

import {
  ElementType,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Popover } from '@headlessui/react';
import styles from './dropdown.module.scss';

const DropdownContext = createContext<any>({});

export function Dropdown({ children }: PropsWithChildren) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowElement,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
      ],
    },
  );

  const value = {
    popperProps: {
      styles: popperStyles,
      attributes,
    },
    reference: {
      referenceElement,
      setReferenceElement,
    },
    arrow: {
      setArrowElement,
      arrowElement,
    },
    popper: {
      popperElement,
      setPopperElement,
    },
  };

  return (
    <DropdownContext.Provider value={value}>
      <Popover as="div" className="relative">
        {children}
      </Popover>
    </DropdownContext.Provider>
  );
}

interface DropdownButton {
  as?: ElementType<any>;
  children?: ReactNode;
  [key: string]: any;
}

function DropdownButton({ children, as, ...props }: DropdownButton) {
  const ctx = useContext(DropdownContext);

  return (
    <Popover.Button as={as} ref={ctx.reference.setReferenceElement} {...props}>
      {children}
    </Popover.Button>
  );
}

function DropdownContent({ children }: PropsWithChildren) {
  const ctx = useContext(DropdownContext);

  return (
    <Popover.Panel
      ref={ctx.popper.setPopperElement}
      style={ctx.popperProps.styles.popper}
      {...ctx.popperProps.attributes.popper}
      className={styles.tooltip}
    >
      {children}
    </Popover.Panel>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
