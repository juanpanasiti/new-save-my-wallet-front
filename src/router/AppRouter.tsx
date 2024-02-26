import { Routes, Route } from "react-router-dom"

import { AuthRoutes } from "../auth/routes"
import { SMWRoutes } from "../smw/routes"


export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={ <AuthRoutes/>} />

        <Route path='/*' element={ <SMWRoutes/>} />
    </Routes>
  )
}
