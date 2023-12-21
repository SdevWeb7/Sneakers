import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

function Layout () {


   return (
      <>
         <Navbar />

         <main className={'main'}>
            <Outlet/>
         </main>
      </>
   )
}

export default Layout;