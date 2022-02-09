import * as React from "react";

export default function useSearchParams(
  keys: string[]
): Record<string, string> {
  const params = React.useMemo(
    () => new URLSearchParams(window.location.search),
    [keys]
  );

  return keys.reduce((acc, curr) => ({ ...acc, key: params.get(curr) }), {});
}
