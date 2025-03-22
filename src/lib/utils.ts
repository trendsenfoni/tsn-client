import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function moneyFormat(x?: number, decimal: number = 2) {
  if (!x) {
    x = 0
  }
  let ondalik = 1
  Array.from(Array(decimal).keys()).forEach(() => ondalik = ondalik * 10)
  x = Math.round(ondalik * x) / ondalik

  return x.toLocaleString("en-US") + (x - Math.floor(x) == 0 && decimal > 0 ? '.' + '0'.repeat(decimal) : '')
  // return x.toLocaleString() + (x - Math.floor(x) == 0 ? '.00' : '')


}


export function currSymbol(currency?: string) {
  switch (currency) {
    case 'TL':
    case 'TRY':
      return '₺'
    case 'USD':
      return '$'
    case 'EUR':
    case 'EURO':
      return '€'
    default:
      return currency
  }
}

export function yesterday() {
  return new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substring(0, 10)
}

export function today() {
  return new Date().toISOString().substring(0, 10)
}

export function showWithholdingTax(val?: number) {
  if (val != undefined && val > 0) {
    switch (val) {
      case 0.1: return '1/10'
      case 0.2: return '2/10'
      case 0.3: return '3/10'
      case 0.4: return '4/10'
      case 0.5: return '5/10'
      case 0.6: return '6/10'
      case 0.7: return '7/10'
      case 0.8: return '8/10'
      case 0.9: return '9/10'
      case 1: return '10/10'
      default: return 'Unknown Rate'
    }
  } else {
    return ''
  }
}