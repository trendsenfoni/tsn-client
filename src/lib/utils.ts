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



export function firmTypeList(firmType: string, t: any) {
  if (firmType == 'c') {
    return [
      { _id: 'c', text: t('Customer') },
      { _id: 'cv', text: t('Customer & Vendor') },
      { _id: 'cc', text: t('Customer Candidate') },
    ]
  } else if (firmType == 'v') {
    return [
      { _id: 'v', text: t('Vendor') },
      { _id: 'cv', text: t('Customer & Vendor') },
    ]
  } else if (firmType == 'cc') {
    return [
      { _id: 'cc', text: t('Customer Candidate') },
    ]
  } else {
    return [
      { _id: 'c', text: t('Customer') },
      { _id: 'v', text: t('Vendor') },
      { _id: 'cv', text: t('Customer & Vendor') },
      { _id: 'cc', text: t('Customer Candidate') },
    ]
  }
}

export function firmTypeName(firmType: string, t: any) {
  switch (firmType) {
    case 'c': return t('Customer')
    case 'v': return t('Vendor')
    case 'cv': return t('Customer & Vendor')
    case 'cc': return t('Customer Candidate')
    default: return t('Unknown')
  }
}