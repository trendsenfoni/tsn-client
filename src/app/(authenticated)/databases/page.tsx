"use client"

import { useLanguage } from '@/i18n'
import { ListGrid, Col, Cell, GridCellType } from '../(components)/list-grid'

export default function DatabasesPage() {
  const { t } = useLanguage()
  return (
    <ListGrid
      apiPath='/databases'
      headers={[
        <Col>Name</Col>,
        <Col>Identifier</Col>,
      ]}
      cells={[
        { children: '{e.name}' },
        { children: '{e.identifier}' },
      ]}
    />
  )
}

