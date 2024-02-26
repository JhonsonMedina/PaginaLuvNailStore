import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './registro.css'

function Registro() {
  const navigate = useNavigate(); // 1/3para redireccionar despues del registro

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [direction, setDirection]= useState("")  //primera parte agregar constantes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreate, setUserCreate] = useState(false); //  2/3 para redireccionar el usuario al login si su verificacion es correcta

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value); //Tercera parte
  };
  const handleDirection = (e) => {
    setDirection(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
 
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //4to paso crear funcion para el boton
  const handleSubmit = () => {
    if (!name || !lastName || !direction || !email || !password) {
      alert('todos los campos son obligatorios');
      return;
    }

    const user = {
      name: name,
      lastName: lastName,
      direction: direction,
      email: email,
      password: password,
    };

    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('direction').value='';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    //5to paso Fetch
    fetch('http://localhost:8080/api/v1/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), //Debemos intalar npm install cors en el backend
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName('');
        setLastName('');
        setDirection('');
        setEmail('');
        setEmail('');
        setPassword('');
        if (data.status === 201) setUserCreate(true);
      })
      .catch((error) => {
        console.error('error:', error);
      });
  };
  useEffect(() => {
    if (userCreate) {
      navigate('/login');
    }
  }, [navigate, userCreate]);


  return (
    <>

    <div className='budy'>
    <div class="wrapper">
<form action="">

    <h1 className='registro'>Registrate</h1>
 
    <div class="input-box">
    <input
     id="name" 
     type="text"
     placeholder="Nombre " 
     onChange={handleName}
     required />

    <i class='bx bxs-user'></i>
    </div>
    <div class="input-box">
    <input
    id='lastName'
     type="text"
     placeholder="Apellido"
     required 
     onChange={handleLastName}
      />
    <i class='bx bxs-user'></i>
    </div>

    <div class="input-box">
    <input
    id='direction'
     type="text" 
     placeholder="Direccion"
     onChange={handleDirection}
      required />

    <i class='bx bxs-user'></i>
    </div>

    <div class="input-box">
    <input
    id='email'
     type="text" 
     placeholder="email"
     onChange={handleEmail}
     required />

    <i class='bx bxs-user'></i>
    </div>


    <div class="input-box">
    <input
    id='password'
   
    placeholder="password" 
    onChange={handlePassword}
    required />
    <i class='bx bxs-lock-alt' ></i>
    </div>

    <div>  
    <a className='button'>
      <span
    onClick={handleSubmit}
    id='boton'> Registrate
     </span><i></i></a>
     
     
     </div>

     <div>


     
        <Link  to="/">
    <button className='volver'>Volver</button> 
        </Link>
     </div>
     
   </form>

  </div>
  </div>

    </>
  );
}

export default Registro;
