import { match } from "path-to-regexp";

interface Match {
  params: object;
}

export default function usePathParams(path: string) {
  const matchFn = match(path, { decode: decodeURIComponent });
  const matchResult = matchFn(window.location.pathname) as Match;
  return matchResult.params;
}
