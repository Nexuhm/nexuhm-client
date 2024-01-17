import { IconName } from '../icon';

export interface InputProps<T = HTMLElement> extends React.HTMLProps<T> {
  label?: string;
  icon?: IconName;
  containerClassName?: string;
  error?: string;
}
