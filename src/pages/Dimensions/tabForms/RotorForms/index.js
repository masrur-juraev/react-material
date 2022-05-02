import React, { Fragment } from 'react'
import { Stack } from '@material-ui/core'
import Hole from './Hole'
import Lamination from './LaminationRotor'
import Slot from './Slot'
import Conductor from './Conductor'
import {useSelector} from "react-redux";

export default function StatorForms() {
  const { rotorLaminationType } = useSelector(state => state.rotor);

  return (
    <Stack spacing={8}>
      <Lamination />
      {rotorLaminationType !== '' ? (
        rotorLaminationType === 'LamHole' ? (
          <Hole />
        ) : (
          <Fragment>
            <Slot />
            <Conductor />
          </Fragment>
        )
      ) : (
        <></>
      )}
    </Stack>
  )
}
