import { Outlet } from "react-router-dom"
import './DefaultLayout.scss'
import { HeaderNavigation } from "../components"

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