import { Outlet } from "react-router-dom"

function HeaderNavigation() {

  return (
    <>
    <div>
        Todo: Buttons!
        Also.. learn how to properly add css to react-components. Need extra css file?
      <Outlet/>
    </div>
    </>
  )
}

export default HeaderNavigation