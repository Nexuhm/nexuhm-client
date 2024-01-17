import { HeadingPlugin } from './heading-plugin';
import { ListPlugin } from './list-plugin';

export function ToolbarPlugin() {
  return (
    <div className="flex gap-2 rounded-t-lg border border-b-0 border-light-gray p-2">
      <HeadingPlugin />
      <ListPlugin />
    </div>
  );
}
