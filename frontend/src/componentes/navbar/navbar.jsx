import '../navbar/navbar.css'
import barra from '../../assets/img/menu.svg'
import fondo from '../../assets/img/fon5.jpg'
import { Link } from 'react-router-dom';


const Navbar = () => {
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

            </ul>
        </nav>
</header>


       
     
    </>
    )
}

export default Navbar;