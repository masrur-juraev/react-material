import React, {useEffect} from 'react'
import {
    Box,
    Grid,
    Typography,
    Stack, Container,
} from '@material-ui/core'
import useImage from 'src/hooks/useImage'

// ----------------------------------------------------------------------

export default function FlowRateImage(props) {
    const { coolingImageUrl, getCoolingImageUrl } = useImage()

    console.log(coolingImageUrl)
    return (
        <Grid container sx={{ height: 'inherit' }} spacing={4}>
            <Grid item md={8}>
                <Container>
                    {coolingImageUrl && (
                        <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
                            <Stack spacing={2}>
                                <Typography align="center" fontSize={18} fontWeight={900}>
                                    Axial View
                                </Typography>
                                <Box component="img" src={coolingImageUrl} />
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
