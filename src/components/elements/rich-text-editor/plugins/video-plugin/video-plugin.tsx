import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_NORMAL,
  EditorConfig,
  ElementNode,
  LexicalEditor,
  createCommand,
} from 'lexical';

export class VideoNode extends ElementNode {
  static clone(node: VideoNode): VideoNode {
    return new VideoNode(node.__key);
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    return element;
  }
}

export function $createVideoNode(): VideoNode {
  return new VideoNode();
}

export function VideoPlugin() {
  const [editor] = useLexicalComposerContext();

  editor.registerCommand(
    createCommand('insertVideo'),
    () => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, $createVideoNode);
      }

      return false;
    },
    COMMAND_PRIORITY_NORMAL,
  );

  return null;
}
