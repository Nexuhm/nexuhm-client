import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { ToolbarCommandList, ToolbarListOption } from './toolbar-command-list';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export function HeadingPlugin() {
  const [editor] = useLexicalComposerContext();
  const options: ToolbarListOption<HeadingTag>[] = Array.from({
    length: 6,
  }).map((_, index) => ({
    label: `Heading ${index + 1}`,
    value: `h${index + 1}` as HeadingTag,
  }));

  const onChange = (tag: HeadingTag) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  return (
    <ToolbarCommandList
      title="Headings"
      onChange={onChange}
      options={options}
    />
  );
}
