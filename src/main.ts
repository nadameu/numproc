import { update } from "./update";

export function main() {
  const input = document.querySelector<HTMLInputElement>("input")!;
  const reset =
    document.querySelector<HTMLButtonElement>("button[type=reset]")!;
  const output = document.querySelector<HTMLOutputElement>("output")!;
  reset.addEventListener("click", () => {
    input.value = "";
    input.focus();
    update(output, input.value);
  });
  input.addEventListener("input", () => update(output, input.value));
  update(output, input.value);
}
