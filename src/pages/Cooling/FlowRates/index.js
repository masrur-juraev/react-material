import React from 'react'
import { Stack} from '@material-ui/core'
import FlowRates from "./FlowRates";
import FlowRateImage from "./FlowRateImage";
/* ----------------------------------------------------------------- */

export default function FlowRatesIndex() {
    return (
        <Stack spacing={8}>
            <FlowRates />
        <FlowRateImage/>
        </Stack>
    )
}
