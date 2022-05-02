import React from 'react'
import { Stack} from '@material-ui/core'
import MachineOptions from "./modal/MachineOptions";

export default function ModelTree() {
  return (
    <Stack spacing={8}>
      <MachineOptions/>
    </Stack>
  )
}
