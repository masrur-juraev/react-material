import React, { Fragment, useState } from 'react'
// material
import { Tabs, Grid, Tab, Stack, Box, Divider } from '@material-ui/core'
import { capitalCase } from 'capital-case'

// hooks
import useSettings from '../../hooks/useSettings'

// components
import Page from '../../customComponents/Page'
import { DIMENSIONS, PROJECT_NAME} from 'src/utils/constants'
import StatorForms from './tabForms/StatorForms'
import RotorForms from './tabForms/RotorForms'
import Scrollbar from 'src/customComponents/Scrollbar'
import StatorImages from './tabImages/StatorImages'
import HousingImages from './tabImages/HousingImages'
import RotorImages from './tabImages/RotorImages'
import useImage from 'src/hooks/useImage'
import HousingForms from "./tabForms/HousingForms";
import SplitPane from "react-split-pane";
import {makeStyles} from "@mui/styles";

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'housing',
    forms: <HousingForms />,
    images: <HousingImages />,
  },
  {
    value: 'stator',
    forms: <StatorForms />,
    images: <StatorImages />,
  },
  {
    value: 'rotor',
    forms: <RotorForms />,
    images: <RotorImages />,
  },
];

const useStyles = makeStyles(() => ({
  splitPane: {
    position: 'unset!important'
  }
}));

export default function Dimensions() {
  const classes = useStyles();
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('stator');
  const { clearHoleImageUrl, clearConductorImageUrl, clearMainImageUrl, clearSlotImageUrl } = useImage();

  const handleChangeTab = (event, newValue) => {
    clearHoleImageUrl();
    clearConductorImageUrl();
    clearMainImageUrl();
    clearSlotImageUrl();
    setCurrentTab(newValue)
  };

  return (
    <Page title={`${DIMENSIONS} | ${PROJECT_NAME}`} sx={{ height: '100%' }}>
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
          <Box
            maxWidth={themeStretch ? false : 'xl'}
            sx={{ height: 'inherit' }}
          >
            {TABS.map((tabItem, index) => {
              const isMatched = tabItem.value === currentTab
              return isMatched && <Fragment key={index}>{tabItem.images}</Fragment>
            })}
            {/*<BottomBar />*/}
          </Box>
        </SplitPane>
      </Grid>
    </Page>
  )
}
