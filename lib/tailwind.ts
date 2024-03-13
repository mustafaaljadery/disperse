import { useMediaQuery } from 'react-responsive';
import { theme } from '../tailwind.config'; // Your tailwind config

const breakpoints: any = theme?.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool: any = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  //@ts-ignore
  const capitalizedKey: any = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  //@ts-ignore
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}