import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import {
  TRANSFORMERS,
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import { ToolbarPlugin } from './plugins/toolbar-plugin/toolbar-plugin';
import { EditorThemeClasses, LexicalEditor } from 'lexical/LexicalEditor';
import { useEffect, useState } from 'react';
import styles from './rich-text-editor.module.scss';

function Placeholder() {
  return <div className="editor-placeholder">Job description...</div>;
}

const themes: EditorThemeClasses = {
  text: {
    bold: 'textBold',
    italic: 'textItalic',
    underline: 'textUnderline',
  },
};

const editorConfig = {
  namespace: 'NexhumEditor',
  // Theme classNames
  themes,
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
  // Handling of errors during update
  onError: (error: Error) => {
    throw error;
  },
};

interface RichTextEditorProps {
  label?: string;
  initialValue?: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({
  initialValue,
  onChange,
}: RichTextEditorProps) {
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  useEffect(() => {
    if (editor) {
      editor.update(() => {
        if (typeof initialValue === 'string') {
          $convertFromMarkdownString(initialValue);
        }
      });
    }
  }, [editor]);

  useEffect(() => {
    const removeUpdateListener = editor?.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const markdown = $convertToMarkdownString(TRANSFORMERS);
          console.log(markdown);
          onChange(markdown);
        });
      },
    );

    return () => {
      removeUpdateListener?.();
    };
  }, [editor]);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={styles.richTextContainer}>
        <ToolbarPlugin />

        <div className={styles.editorContainer}>
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className={styles.editorContent} />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <TabIndentationPlugin />
            <EditorRefPlugin editorRef={setEditor} />

            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
