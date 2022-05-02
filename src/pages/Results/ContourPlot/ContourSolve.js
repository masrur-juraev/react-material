import React, {useState } from 'react'
import {
    Stack,
    TextField,
    MenuItem,
    Typography
} from '@material-ui/core'
import { contour_data} from 'src/utils/constants'

import useImage from 'src/hooks/useImage'
import {useSelector} from "react-redux";

/* ----------------------------------------------------------------- */

export default function ContourSolve() {
    const { getContourImageUrl } = useImage()
    //  useStates
    const [contourValue, setContourValue] = useState('0')
    const {newMachineID, loadedMachine } = useSelector(state => state.machine);
    //  functions
    const handleContourComponent = (value) => {
        const machineID = newMachineID ? newMachineID : loadedMachine.id;
        setContourValue(value)
        getContourImageUrl(value,machineID)
        console.log(value,machineID)
    }
    return (
        <Stack spacing={2}>
            <Typography>
               <b> Please choose the Contour Component Type</b>
            </Typography>

            <TextField
                select
                name="axialComponent"
                label="Component Type"
                variant="outlined"
                size="small"
                value={contourValue}
                margin="dense"
                onChange={(e) => handleContourComponent(e.target.value)}
            >
                {Object.keys(contour_data.numbers).map((itemData,index) => (
                    <MenuItem key={index} value={itemData}>
                        {itemData}
                    </MenuItem>
                ))}
            </TextField>

        </Stack>
    )
}
