export type Maybe<T> = T | undefined;

export const stringIsNumeric = (argument: string): boolean => {
  if (argument === "") {
    return false;
  }
  return !Number.isNaN(Number(argument));
};
