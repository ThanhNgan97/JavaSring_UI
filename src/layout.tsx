import { Outlet } from "react-router"
import AppHeader from "./components/layout/AppHeader"
import AppFooter from "./components/layout/AppFooter"



const AppLayout = () => {
  return (
    
    <>
        <AppHeader/>
        <Outlet/>
        <AppFooter/>
    </>
  )
}

export default AppLayout
