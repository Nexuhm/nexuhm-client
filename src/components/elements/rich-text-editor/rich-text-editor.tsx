import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { ToolbarPlugin } from './plugins/toolbar-plugin/toolbar-plugin';
import { EditorThemeClasses } from 'lexical/LexicalEditor';
import styles from './rich-text-editor.module.scss';
import { EditorState } from 'lexical';

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
  onChange: (value: EditorState) => void;
}

export function RichTextEditor({ onChange }: RichTextEditorProps) {
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
              placeholder={<Placeholder   />}
              ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <TabIndentationPlugin />

            <OnChangePlugin onChange={onChange} />

            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
