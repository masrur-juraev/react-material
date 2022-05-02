import React, {useEffect} from 'react'
import {
  Box,
  Grid,
  Typography,
  Container,
  Stack,
} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";
import { onGetLossMainImageUrl } from "../../store/actions/loss";

const useStyles = makeStyles(() => ({
  root: {
    height: 'inherit',
    marginLeft: '0px!important'
  },
  splitPane: {
    position: 'unset!important'
  }
}));

export default function LossesImage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { newMachineID, loadedMachine } = useSelector(state => state.machine);
  const { lossMainImageUrl}  = useSelector(state => state.loss);

  useEffect(() => {
    const currentMachineID = newMachineID ? newMachineID : loadedMachine.id;
    dispatch(onGetLossMainImageUrl(currentMachineID));
  }, [dispatch, newMachineID, loadedMachine]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <Container>
        {lossMainImageUrl && (
          <Stack spacing={4} justifyContent="center" sx={{ mt: 10 }}>
            <Stack spacing={2}>
              <Typography align="center" fontSize={18} fontWeight={900}>
                Axial View
              </Typography>
              <Stack direction="row" justifyContent="center">
                <Box component="img" src={lossMainImageUrl} height={400} width={400} />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
    </Grid>
  )
}
