import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { UserProvider } from './Components/UserContext';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { DarkModeContextProvider } from './Components/darkModeContext'
import { ProfileImageProvider } from './Components/ProfileImageContext';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <DarkModeContextProvider>
      <ProfileImageProvider>
      <UserProvider>
      <App />
      </UserProvider>
      </ProfileImageProvider>
      </DarkModeContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

