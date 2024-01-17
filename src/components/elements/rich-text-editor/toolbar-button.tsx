import React, { ReactNode } from 'react';
import { $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';

interface ToolbarButtonProps {
  type: string;
  children: ReactNode;
}

export function ToolbarButton({ type, children }: ToolbarButtonProps) {
  const [editor] = useLexicalComposerContext();

  const applyFormatting = () => {
    editor.update(() => {
      const selection = $getSelection();

      if (selection !== null) {
        let formatNode;
        switch (type) {
          case 'bold':
            formatNode = $createBoldNode();
            break;
          case 'italic':
            formatNode = $createItalicNode();
            break;
          case 'underline':
            formatNode = $createUnderlineNode();
            break;
          default:
            return;
        }
        $patchStyleText(selection, formatNode);
      }
    });
  };

  return <button onClick={applyFormatting}>{children}</button>;
}

export default ToolbarButton;
