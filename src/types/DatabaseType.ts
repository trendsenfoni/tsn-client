export interface DatabaseType {
  _id?: string
  owner?: string
  identifier?: string
  name?: string
  team?: []
  dbHost?: string
  dbName?: string
  passive?: boolean
}

