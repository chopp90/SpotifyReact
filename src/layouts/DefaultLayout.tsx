import { Outlet } from "react-router-dom"
import HeaderNavigation from "../components/HeaderNavigation"
import './DefaultLayout.scss'

function defaultLayout() {

  return (
    <>
      <div className="layout">
        <HeaderNavigation/>
        <div className="layout__page-content">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default defaultLayout