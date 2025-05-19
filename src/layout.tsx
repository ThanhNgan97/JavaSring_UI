import { Outlet } from "react-router"
import AppHeader from "./components/layout/AppHeader"
import AppFooter from "./components/layout/AppFooter"
import { App } from "antd"



const AppLayout = () => {
  return (
    
    <App>
        <AppHeader/>
        <Outlet/>
        <AppFooter/>
    </App>
    
  )
}

export default AppLayout
