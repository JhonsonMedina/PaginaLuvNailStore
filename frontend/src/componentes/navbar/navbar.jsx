import '../navbar/navbar.css'
import barra from '../../assets/img/menu.svg'
import fondo from '../../assets/img/fon5.jpg'
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/ShoppingCartContext";


const Navbar = () => {
    const [cart, setCart] = useContext(CartContext);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const navStyles = {
    color: "#fff",
    listStyle: "none",
    textDecoration: "none",
  };
      

    return (
        <>
    
      <img className='hero' src={fondo} alt="" />
    
    <header className="header">

        <div className="logo">Menu </div>

        <input type="checkbox" id="toggle" />
        <label for="toggle"><img src={barra} alt="menu" /></label>

        <nav className="navigation">

            <ul>
                <li><a className="hola" href="#">Inicio</a></li>
                <li><a className="hola" href="#">Nosotros</a></li>
                <li> 
                 <Link className="hola" to='/registro'> Registrate</Link>
                </li>
                <li>
                 <Link className="hola" to='/login'> Ingresar</Link>
                </li>


         <li>
        <Link className='hola' to='/cart' style={navStyles}>🛒<span className="cart-count">{quantity}</span>
        </Link>
         </li>

            </ul>
        </nav>
</header>


       
     
    </>
    )
}

export default Navbar;