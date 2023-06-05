import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { DarkModeContextProvider } from './Components/darkModeContext'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <DarkModeContextProvider>
      <App />
      </DarkModeContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

