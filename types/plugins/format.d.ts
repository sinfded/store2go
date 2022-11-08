export interface FormatPlugin {
  currencyFormat(value: number): any
  numberFormat(value: number, minFracDig: number): any
}
