import React, { useState } from 'react'
import {
    Stack,
    TextField,
    MenuItem,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Card,
} from '@material-ui/core'
import {HtcData} from 'src/utils/constants'

/* ----------------------------------------------------------------- */

export default function Housing() {
    //  useStates
    const [surfaceType, setSurfaceType] = useState('')
    //  functions
    return (
        <Stack spacing={2}>
            <TextField
                select
                name="surfaceType"
                label="Surface Type"
                variant="outlined"
                size="small"
                value={surfaceType}
            >
                {Object.keys(HtcData.Surface).map((coolingKey,index) => (
                    <MenuItem key={index} value={coolingKey}>
                        {coolingKey}
                    </MenuItem>
                ))}
            </TextField>

            <TableContainer component={Card}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 1, width: '40%' }}>Surface Name</TableCell>
                            <TableCell sx={{ py: 1, width: '40%' }}>HTC Type</TableCell>
                            <TableCell sx={{ py: 1, width: '20%' }}>HTC Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {HtcData.Surface &&
                        Object.keys(HtcData.Surface).map((itemData,index) => {
                            if (itemData !== 'Type') {
                                if (itemData === 'Passage') {
                                    return (
                                        <TableRow key={itemData}>
                                            <TableCell sx={{ py: 1 }}>
                                                {itemData}
                                            </TableCell>
                                            <TableCell sx={{ py: 1 }}>
                                                <TextField
                                                    select
                                                    variant="outlined"
                                                    name="HTCType"
                                                    size="small"
                                                >
                                                    {Object.keys(HtcData.HTCType).map(
                                                        (itemType) => (
                                                            <MenuItem
                                                                key={itemType}
                                                                value={itemType}
                                                            >
                                                                {itemType}
                                                            </MenuItem>
                                                        ),
                                                    )}
                                                </TextField>
                                            </TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={itemData}>
                                            <TableCell sx={{ py: 1 }}>
                                                {itemData}
                                            </TableCell>
                                            <TableCell sx={{ py: 1 }}>
                                                <TextField
                                                    type="number"
                                                    inputProps={{ min: 0 }}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            } else {
                                return null
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>


        </Stack>
    )
}
