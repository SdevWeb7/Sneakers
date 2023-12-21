import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout.jsx";
import Collections from "./pages/Collections.jsx";
import CartContext from "./hooks/CartContext.jsx";
import { useState } from "react";
import Women from "./pages/Women.jsx";
import Men from "./pages/Men.jsx";

function App() {
   const [products, setProducts] = useState([])

   const cartValue = {
      products: products,
      setProducts: setProducts
   }

   return (
     <CartContext.Provider value={cartValue}>
     <BrowserRouter>
       <Routes>
         <Route path={'/'} element={<Layout />}>
            <Route path={'/'} element={<Collections />} />
            <Route path={'/women'} element={<Women />} />
            <Route path={'/men'} element={<Men />} />
         </Route>
       </Routes>
     </BrowserRouter>
     </CartContext.Provider>
  )
}
export default App
