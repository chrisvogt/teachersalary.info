import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
