import React from 'react'
import { Stack} from '@material-ui/core'
import HTC from "./HTC";
import HTCTable from "./HTCTable";
import HTCTableOutlet from "./HTCTableOutlet";
import HTCLayout from "./HTCLayout";
/* ----------------------------------------------------------------- */

export default function HTCIndex() {
    return (
        <Stack spacing={8}>
              <HTC/>
            <HTCTable/>
            <HTCTableOutlet/>
            <HTCLayout/>
        </Stack>
    )
}
