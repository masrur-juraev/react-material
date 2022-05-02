import React, {useCallback, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter, InputLabel, Select, MenuItem, Box, FormControl, Input
} from '@material-ui/core';
import {TextField} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));

//Sample Table values to display
let Surfaces = [], STATUSES = ['Active', 'Pending', 'Blocked'];
for(let i=0;i<1;i++) {
    Surfaces[i] = {
        name: 'SurfaceName1',
        HTCType: 'Value to be updated',
        HTCValue: 'Based on the Type',
    }
}



function HTCTableOutlet() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [htcValue,setHtcValue]=useState(null)
    const handleChange = useCallback((value) => {
        setHtcValue(value);
    }, [htcValue]);
    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Typography>
               <b>***A sample Table Structure for the HTC***</b>
            </Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>REGION</TableCell>
                        <TableCell className={classes.tableHeaderCell}>HTC OPTION</TableCell>
                        <TableCell className={classes.tableHeaderCell}>HTC value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Surfaces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>
                                <Grid container>
                                    <Grid item lg={10}>
                                        <Typography className={classes.name}>{row.name}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.HTCType}</Typography>
                                        <Typography color="textSecondary" variant="body2">{row.HTCValue}</Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                <Typography color="primary" variant="subtitle2">
                                    <Box sx={{minWidth:120}}>
                                        <FormControl fullWidth>
                                        <InputLabel id="sample">{row.HTCType}</InputLabel>
                                        <Select
                                            labelId="sample"
                                            id="sampleSelect"
                                            value={htcValue}
                                            label="Sample HTC Type"
                                            onChange={(e) => handleChange(e.target.value)}
                                        >
                                            <MenuItem>HtcValue1</MenuItem>
                                            <MenuItem>HtcValue2</MenuItem>
                                            <MenuItem>HtcValue3</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </Box>
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="body2">
                                    <Box sx={{minWidth:120}}>
                                        <FormControl fullWidth>
                                            <Input label="HTCValue" type="number" id="sample">HTC Value</Input>
                                        </FormControl>
                                    </Box>
                                </Typography>
                            </TableCell>
                            {/*<TableCell>*/}
                            {/*    <Typography*/}
                            {/*        className={classes.status}*/}
                            {/*        style={{*/}
                            {/*            backgroundColor:*/}
                            {/*                ((row.status === 'Active' && 'green') ||*/}
                            {/*                    (row.status === 'Pending' && 'blue') ||*/}
                            {/*                    (row.status === 'Blocked' && 'orange'))*/}
                            {/*        }}*/}
                            {/*    >{row.status}</Typography>*/}
                            {/*</TableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default HTCTableOutlet;