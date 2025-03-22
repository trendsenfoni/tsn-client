import { AddressType, CountryType } from './AddressType'

export interface Firm {
  _id?: string
  type?: string | 'c' | 'v' | 'cv' | undefined
  name?: string
  currency?: string
  article?: string
  billingInfo?: {
    individual?: boolean
    companyName?: string
    firstName?: string
    lastName?: string
    taxOffice?: string
    taxNumber?: string
    idCardNo?: string
  }
  address?: {
    room?: string
    streetName?: string
    blockName?: string
    buildingName?: string
    buildingNumber?: string
    citySubdivisionName?: string
    cityName?: string
    postalZone?: string
    postbox?: string
    region?: string
    district?: string
    country?: CountryType
  }
  passive?: boolean
}