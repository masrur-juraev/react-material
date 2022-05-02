import React from 'react'
import { Stack} from '@material-ui/core'

import ResultTable from "./ResultTable";
import SolveTable from "./SolveTable";
/* ----------------------------------------------------------------- */

export default function ResultTableIndex() {
    return (
        <Stack spacing={8}>
            <SolveTable/>
        </Stack>
    )
}
