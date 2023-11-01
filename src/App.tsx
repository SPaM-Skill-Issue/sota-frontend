import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout, theme } from "antd";
import HeaderNavigation from './components/headerNavigation';
import Home from './pages/Home'
import Audience from './pages/Audience'
import Sports from './pages/sports'
import Medal from './pages/Medal'
import Logo from '/sotaTransparentBgLogo.svg';

const { Header, Content } = Layout;

function App() {
  return (
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
          <div class="w-full flex justify-center">
            <HeaderNavigation />
          </div>
        </Header>
        <Content>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/audience" element={<Audience />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/medal" element={<Medal />} />
            </Routes>
          </BrowserRouter>
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
