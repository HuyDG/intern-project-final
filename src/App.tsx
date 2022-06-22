import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Container, CssBaseline } from "@mui/material"

import NavBar from "./components/NavBar/NavBar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Stream from "./pages/Stream"
import Dashboard from "./pages/Dashboard"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id/profile" element={<Profile />} />
          <Route path="/movie/:id/stream" element={<Stream />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
