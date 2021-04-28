import * as React from "react";

export default function useSearchParams(keys: string[]) {
  const params = React.useMemo(
    () => new URLSearchParams(window.location.search),
    [keys]
  );

  return keys.map((k) => ({ key: params.get(k) }));
}
