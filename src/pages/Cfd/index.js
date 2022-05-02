import React from 'react'
// material
import { Container, Typography } from '@material-ui/core'
// hooks
import useSettings from '../../hooks/useSettings'
// components
import Page from '../../customComponents/Page'
import { PROJECT_NAME } from 'src/utils/constants'

// ----------------------------------------------------------------------

export default function CFD() {
  const { themeStretch } = useSettings()

  return (
    <Page title={`CFD | ${PROJECT_NAME}`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          CFD
        </Typography>
      </Container>
    </Page>
  )
}
