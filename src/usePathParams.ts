import { compile, match, PathFunction } from "path-to-regexp";

export type Params<Key extends string = string> = {
  readonly [key in Key]: string | undefined;
};

export default function usePathParams<
  ParamsOrKey extends string | Record<string, string | undefined> = string
>(
  path: string
): Readonly<
  [ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>
> {
  const matchFn = match(path, { decode: decodeURIComponent });
  const matchResult = matchFn(window.location.pathname);

  return matchResult ? (matchResult.params as any) : {};
  // return {
  //   toPath: compile(path),
  //   params: matchResult ? matchResult.params : undefined,
  // };
}
