import { Outlet } from "react-router"
import AppHeader from "./components/layout/AppHeader"



const AppLayout = () => {
  return (
    
    <>
        <AppHeader/>
        <Outlet/>
    </>
  )
}

export default AppLayout
