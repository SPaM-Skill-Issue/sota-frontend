import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout, theme } from "antd";
import HeaderNavigation from './components/headerNavigation';
import Home from './pages/home'
import Audience from './pages/audience'
import Sports from './pages/sports'
import Medal from './pages/medal'

const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#dba94d",
          colorInfo: "#dba94d",
          colorSuccess: "#4c9f70",
          colorError: "#9b2915",
          colorBgBase: "#1b2021",
          colorBgContainer: "#213555"

        },
        algorithm: theme.darkAlgorithm,
      }}>
        <Layout>
          <Header className=" bg-eeric-black-light flex">
            <div >
              <img src="/sotaTransparentBgLogo.svg" alt="SoTA" className=" h-14 pt-3" />
            </div>
            <div className="w-full flex justify-center">
              <HeaderNavigation />
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/medal" element={<Medal />} />
            </Routes>

          </Content>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
