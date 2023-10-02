export type Either<a, b> = Left<a> | Right<b>;

export type Left<a> = { isLeft: true; isRight: false; leftValue: a };
export function Left<a>(leftValue: a): Left<a> {
  return { isLeft: true, isRight: false, leftValue };
}

export type Right<b> = { isLeft: false; isRight: true; rightValue: b };
export function Right<b>(rightValue: b): Right<b> {
  return { isLeft: false, isRight: true, rightValue };
}
