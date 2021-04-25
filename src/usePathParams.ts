import { compile, match } from "path-to-regexp";

export default function usePathParams(path: string) {
  const matchFn = match(path, { decode: decodeURIComponent });
  const matchResult = matchFn(window.location.pathname);

  return {
    toPath: compile(path),
    params: matchResult ? matchResult.params : undefined,
  };
}
