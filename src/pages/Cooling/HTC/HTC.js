import React, {useState} from 'react'
import {
    MenuItem,
    Stack, TextField,
    Typography
} from '@material-ui/core'
import {FORM_DATA} from "../../../utils/constants";
/* ----------------------------------------------------------------- */

export default function HTC() {
    const [coolingType, setCoolingType] = useState('')
    return (

        <Stack spacing={2}>
          <Typography>
              <h2>Heat Transfer Page</h2>
           </Typography>
            Cooling Setup
                <TextField
                    select
                    name="coolingType"
                    label="Cooling Setup"
                    variant="outlined"
                    size="small"
                    value={coolingType}

                >
                    {Object.keys(FORM_DATA.CoolingSetp).map((coolingKey,index) => (
                        <MenuItem key={index} value={coolingKey}>
                            {coolingKey}
                        </MenuItem>
                    ))}
                </TextField>



        </Stack>

    )
}
