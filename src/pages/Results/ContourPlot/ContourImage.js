import React, { useEffect } from 'react'
import {
    Box,
    Grid,
    Typography,
    Stack, Container, MenuItem,
} from '@material-ui/core'
import useImage from 'src/hooks/useImage'
import {contour_data} from "../../../utils/constants";

// ----------------------------------------------------------------------

export default function ContourImage(props) {
    const { contourImageUrl, getContourImageUrl } = useImage()

    //
    // useEffect(() => {
    //     if (contourImageUrl) {
    //         getContourImageUrl()
    //     }
    // }, [contourImageUrl])

    return (
        <Grid container sx={{ height: 'inherit' }} spacing={4}>
    <Grid item md={8}>
        <Container>
            {contourImageUrl && (
                <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
                    <Stack spacing={2}>
                        <Typography align="center" fontSize={18} fontWeight={900}>
                           <p align="center"> Contour Stator Winding</p>
                        </Typography>
                        <Box component="img" src={contourImageUrl} />
                    </Stack>

                    <Stack direction="row" justifyContent="center">

                    </Stack>
                </Stack>
            )}
        </Container>
    </Grid>
        </Grid>

    )
}
