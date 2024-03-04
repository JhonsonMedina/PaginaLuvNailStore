
import Movimiento from "./componentes/Movimiento/movimiento"
import { ItemList } from "./componentes/carrito/ItemList"
import { ShoppingCart } from "./componentes/carrito/ShoppingCart"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ShoppingCartProvider } from "./componentes/contexts/ShoppingCartContext"
import Galeria from "./componentes/galeria/galeria"
import Navbar from "./componentes/navbar/navbar"




const Root = () => {
  return (
    <>
    <ShoppingCartProvider>
   
     <Navbar/>
    <Movimiento />
     <Galeria />
     
     

     <Routes>
     <Route path="/" element={<ItemList />} />
     <Route path="/cart" element={<ShoppingCart />} />
     </Routes>

 
    
  </ShoppingCartProvider>
             
   
    </>
  )
}
export default Root;
