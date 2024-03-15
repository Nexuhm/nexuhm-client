import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from '@/components/elements/button';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListOl, faListUl } from '@fortawesome/free-solid-svg-icons';

type ListTag = 'ol' | 'ul';

export function ListPlugin() {
  const [editor] = useLexicalComposerContext();

  const onChange = (tag: ListTag) => {
    editor.update(() => {
      const command =
        tag === 'ol'
          ? INSERT_ORDERED_LIST_COMMAND
          : INSERT_UNORDERED_LIST_COMMAND;

      editor.dispatchCommand(command, undefined);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onChange('ul')}
        className="!px-2 !py-0.5"
        variant="secondary"
      >
        <FontAwesomeIcon icon={faListUl} />
      </Button>

      <Button
        onClick={() => onChange('ol')}
        className="!px-2 !py-0.5"
        variant="secondary"
      >
        <FontAwesomeIcon icon={faListOl} />
      </Button>
    </div>
  );
}
