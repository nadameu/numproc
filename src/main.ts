import { update } from "./update";

export function main() {
  const form = document.querySelector<HTMLFormElement>("form")!;
  const input = document.querySelector<HTMLInputElement>("input")!;
  const reset =
    document.querySelector<HTMLButtonElement>("button[type=reset]")!;
  const output = document.querySelector<HTMLOutputElement>("output")!;

  form.addEventListener("submit", (e) => e.preventDefault());
  reset.addEventListener("click", () => {
    input.value = "";
    input.focus();
    update(output, input);
  });
  input.addEventListener("input", () => update(output, input));
  update(output, input);
}
