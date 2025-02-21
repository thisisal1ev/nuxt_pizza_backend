export function conversionToArr(param: string | undefined) {
  return param?.split(',').map(Number);
}
