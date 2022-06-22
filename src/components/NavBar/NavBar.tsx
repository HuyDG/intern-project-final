import React, { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"

const NavBar: React.FC = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  useEffect(() => {
    ;(async () => {
      if (!isAuthenticated) return

      const token = await getAccessTokenSilently()

      localStorage.setItem("access_token", token)
    })()
  }, [isAuthenticated, getAccessTokenSilently])

  const handleLogin = async () => loginWithRedirect()

  const handleLogout = () => logout({ returnTo: window.location.origin })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Stack direction="row" spacing={3}>
              <Avatar alt={user?.nickname} src={user?.picture} />
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
