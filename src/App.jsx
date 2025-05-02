import { ConfigProvider } from 'antd'
import './App.scss'
import Footer from './components/Footer'
import Header from './components/Header/Header'
import Index from './pages/Routes'
import '@ant-design/v5-patch-for-react-19';
import Screnloader from './components/ScreenLoader/Screnloader'
import { useAuthContext } from './context/Auth'
function App() {
  const { isAppLoading } = useAuthContext()
  return (
    <>
      {!isAppLoading
        ? <>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#001524',
              },
            }}
          >
            <Index />
            <Footer />
          </ConfigProvider></>
        : <>
          <Screnloader /></>
      }
    </>
  )
}

export default App
