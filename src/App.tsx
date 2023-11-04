import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import HeaderNavigation from './components/headerNavigation';
import Home from './pages/home'
import Audience from './pages/audience'
import Sports from './pages/sports'
import Medal from './pages/medal'

const { Header, Content } = Layout;

function App() {
    return (
        <BrowserRouter>
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
                    <div className="my-10 mx-16">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/audience" element={<Audience />} />
                            <Route path="/sports" element={<Sports />} />
                            <Route path="/medal" element={<Medal />} />
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </BrowserRouter>
    )
}

export default App
