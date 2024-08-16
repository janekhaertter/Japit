export type Identifier = string | number | symbol;

export function isIdentifier(value: any): value is Identifier {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol'
  );
}
