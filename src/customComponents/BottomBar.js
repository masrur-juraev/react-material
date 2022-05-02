import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core'
import { alpha, styled } from '@material-ui/core/styles'

/* ---------------------------------------------------------------- */
const DESKTOP_FOOTER_HEIGHT = 160

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 1),
  position: 'fixed',
  top: 'auto',
  bottom: 0,
  right: 'auto',
}))

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    minHeight: DESKTOP_FOOTER_HEIGHT,
    padding: theme.spacing(0, 5),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}))
/* ---------------------------------------------------------------- */
export default function BottomBar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ ml: 60 }}>
          <Typography fontSize={16} align="center" sx={{ color: 'black' }}>
            Help/Explaination Window
          </Typography>
          <Typography fontSize={16} align="center" sx={{ color: 'black' }}>
            To be populated depending on selection
          </Typography>
        </Box>
      </ToolbarStyle>
    </RootStyle>
  )
}
