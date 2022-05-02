import React, { Fragment, useState } from 'react'
// material
import { Tabs, Grid, Tab, Stack, Box, Divider } from '@material-ui/core'
import { capitalCase } from 'capital-case'

// hooks
import useSettings from '../../hooks/useSettings'

// components
import Page from '../../customComponents/Page'
import { COOLING, PROJECT_NAME } from 'src/utils/constants'
import Scrollbar from 'src/customComponents/Scrollbar'
import FlowRates from "./FlowRates/FlowRates";
import HTC from "./HTC/HTC";
import FlowRateImage from "./FlowRates/FlowRateImage";
import HTCTableOutlet from "./HTC/HTCTableOutlet";
import {makeStyles} from "@mui/styles";
import SplitPane from "react-split-pane";

// ----------------------------------------------------------------------

const TABS = [

    {
        value: 'HEAT TRANSFER',
        forms:<HTC/>,
        images: <HTCTableOutlet/>

    },
    {
        value: 'FLOW RATES',
        forms: <FlowRateImage />,
        images:<FlowRates/>

    },
]
// ----------------------------------------------------------------------
const useStyles = makeStyles(() => ({
    root: {
        height: 'inherit',
        marginLeft: '0px!important'
    },
    splitPane: {
        position: 'unset!important'
    }
}));

export default function Dimensions() {
    const classes=useStyles();
    const { themeStretch } = useSettings()
    const [currentTab, setCurrentTab] = useState('FLOW RATES')

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue)
    }

    return (
        <Page title={`${COOLING} | ${PROJECT_NAME}`} sx={{ height: '100%' }}>
            <Grid container sx={{ height: '100%' }}>
                <SplitPane className={classes.splitPane} split="vertical" minSize={200} defaultSize={300} maxSize={450}>
                    <Stack sx={{ height: '100%' }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={currentTab}
                            onChange={handleChangeTab}
                            sx={{ pl: 2 }}
                        >
                            {TABS.map((tabItem, index) => (
                                <Tab
                                    key={index}
                                    label={capitalCase(tabItem.value)}
                                    value={tabItem.value}
                                    sx={{ alignItems: 'start' }}
                                />
                            ))}
                        </Tabs>
                        <Divider />
                        <Box sx={{ flex: 1, px: 2, py: 5 }}>
                            {TABS.map((tabItem, index) => {
                                const isMatched = tabItem.value === currentTab
                                return (
                                    isMatched && (
                                        <Scrollbar
                                            sx={{
                                                maxHeight: '63vh',
                                                '& .simplebar-content': {
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                },
                                                p: 2,
                                            }}
                                            key={index}
                                        >
                                            {tabItem.forms}
                                        </Scrollbar>
                                    )
                                )
                            })}
                        </Box>
                    </Stack>
                </SplitPane>
                <Grid item xs={12} md={9} sx={{ height: '100%' }}>
                    <Box
                        maxWidth={themeStretch ? false : 'xl'}
                        sx={{ flex: 1, height: 'inherit' }}
                    >
                        {TABS.map((tabItem, index) => {
                            const isMatched = tabItem.value === currentTab
                            return isMatched && <Fragment key={index}>{tabItem.images}</Fragment>
                        })}
                        {/*<BottomBar />*/}
                    </Box>
                </Grid>
            </Grid>
        </Page>
    )
}
