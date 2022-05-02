import React from 'react'
import { Stack } from '@material-ui/core'
import LaminationStator from './LaminationStator'
import Slot from './Slot'
import Conductor from './Conductor'

/* ----------------------------------------------------------------- */

export default function StatorForms() {
  return (
    <Stack spacing={8}>
      <LaminationStator />
      <Slot />
      <Conductor />
    </Stack>
  )
}
