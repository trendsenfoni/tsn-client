import { AddressField } from './AddressField'
import { Contact } from './Contact'
import { Person } from './Person'

export interface Party {
  websiteURI?: string,
  partyName?: string,
  person: Person,
  partyIdentification: PartyIdentification[],
  partyTaxScheme: { type: String, default: '', index: true },
  postalAddress: AddressField
  contact: Contact
}

export interface PartyIdentification {
  schemeID?: string
  ID?: string
}