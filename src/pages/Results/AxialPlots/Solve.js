import React, {useState } from 'react'
import {
    Stack,
    TextField,
    MenuItem, Typography,
} from '@material-ui/core'
import {Axial_Data} from 'src/utils/constants'

import useImage from 'src/hooks/useImage'
import {useSelector} from "react-redux";

/* ----------------------------------------------------------------- */

export default function Solve() {

    const { getAxialImageUrl } = useImage()


    //  useStates
    const [axialComponent, setAxialComponent] = useState('')

    const {newMachineID, loadedMachine } = useSelector(state => state.machine);
    //  functions
    const handleAxialComponent = (value) => {
        const machineID = newMachineID ? newMachineID : loadedMachine.id;
        setAxialComponent(value)
        console.log(machineID)
        getAxialImageUrl(value,machineID)
    }
    //  useEffects
    return (
        <Stack spacing={2}>
            <Typography>
                <b> Please choose the Axial Component Type</b>
            </Typography>
            <TextField
                select
                name="axialComponent"
                label="Component Type"
                variant="outlined"
                size="small"
                value={axialComponent}
                onChange={(e) => handleAxialComponent(e.target.value)}
            >
                {Object.keys(Axial_Data.axialType).map((itemData,index) => (
                    <MenuItem key={index} value={itemData}>
                        {itemData}
                    </MenuItem>
                ))}
            </TextField>

        </Stack>
    )
}
