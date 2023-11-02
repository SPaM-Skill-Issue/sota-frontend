import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#dba94d",
        colorInfo: "#dba94d",
        colorSuccess: "#4c9f70",
        colorError: "#9b2915",
        colorBgBase: "#1b2021",
        colorTextPlaceholder: "#fff",
        fontSize: 20,
      },
      algorithm: theme.darkAlgorithm,
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
