export function truncateString(string: string, number: number) {
  if (string.length <= number) {
    return string;
  }
  return string.slice(0, number).trimEnd() + "...";
}
