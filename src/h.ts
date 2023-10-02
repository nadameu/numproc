export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Partial<HTMLElementTagNameMap[K]> | null,
  ...children: Array<string | HTMLElement>
): HTMLElementTagNameMap[K] {
  const elt = document.createElement(tag);
  for (const [key, value] of Object.entries(props ?? {})) {
    (elt as any)[key] = value;
  }
  elt.append(...children);
  return elt;
}
