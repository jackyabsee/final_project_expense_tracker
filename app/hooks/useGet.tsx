import { useEffect, useState } from "react";
import { Text } from "react-native";
export function useGet<T extends { error?: string }>(
  fetchFn: () => Promise<T>,
  deps: any[]
) {
  const [json, setJson] = useState({ error: "loading..." } as T);
  useEffect(() => {
    fetchFn().then(setJson);
  }, deps);

  function render(renderFn: (json: T) => any) {
    if (json.error) return <Text>{json.error}</Text>;
    return renderFn(json);
  }

  return { json, render };
}
