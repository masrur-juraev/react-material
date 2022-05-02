import {PROJECT_NAME} from "../../../utils/constants";
import {Button, Typography,Stack} from "@material-ui/core";
import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import Page from '../../../customComponents/Page';
import {onEmptyNewIds, onGetMachines, onSaveMachine} from "../../../store/actions/machine";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";


    const useStyles = makeStyles({
        root: {
            display: 'flex',
        },
        buttonDiv: {
            display: 'flex',
            flexDirection: 'column',
            width: 200
        },
        tableSection: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        linkWidth: {
            width: 'fit-content'
        },
        btn: {
            width: 170,
            marginBottom: '20px!important'
        },
        tableRowHover: {
            backgroundColor: '#F2F7FC !important'
        },
        tableRowSelected: {
            backgroundColor: '#dfebf7 !important'
        },
    });



const ModelTreeTab=()=>{
    const onDuplicateMachine = () => {

    };
    const onStartCreateMachine = () => {
        setOpenMachine(true);
    };


    const onDeleteMachine = () => {

    };
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedMachine, setSelectedMachine] = useState(null)
    const [openMachine, setOpenMachine] = useState(false);
    useEffect(() => {
        dispatch(onEmptyNewIds());
        dispatch(onSaveMachine(null));
        dispatch(onGetMachines());
    }, [dispatch]);
    const onLoadMachine = useCallback(() => {
        dispatch(onSaveMachine(selectedMachine));
        const url = '/dashboard/dimensions/';
        navigate(url);
    }, [dispatch, selectedMachine, navigate]);
    const isMachineSelected = useCallback((machine) => {
        if (selectedMachine) {
            return selectedMachine.id === machine.id
        }
        return false;
    }, [selectedMachine]);
    return(
        <Page title={`Model Tree | ${PROJECT_NAME}`}>
            <Stack spacing={2}>
                <div className={classes.root}>
                    <div className={classes.buttonDiv}>
                        <Button className={classes.btn} onClick={onStartCreateMachine} variant="contained">
                            Create New Machine
                        </Button>
                        <Button className={classes.btn} disabled={!selectedMachine} onClick={onLoadMachine} variant="contained">
                            Load Machine
                        </Button>
                        <Button className={classes.btn} disabled={!selectedMachine} onClick={onDuplicateMachine} variant="contained">
                            Duplicate Machine
                        </Button>
                        <Button className={classes.btn} disabled={!selectedMachine} onClick={onDeleteMachine} variant="contained">
                            Delete Machine
                        </Button>
                    </div>
                </div>
            </Stack>
        </Page>

    )
}
export default ModelTreeTab