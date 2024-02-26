import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggeado, setUserLoggeado] = useState({});
  const [userLocal, setUserLocal] = useState({});
  const [userNavigate, setUserNavigate] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleSubmit = () => {
    if (!email || !password) {
      alert('todos los campos son obligatorios');
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(user), //Debemos intalar npm install cors en el backend
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail('');
        setPassword('');
        setUserLoggeado(data);
        localStorage.setItem('token', JSON.stringify(data.token));
      })
      .catch((error) => {
        console.error('error:', error);
      });
  };

  if (userLoggeado.status === 200) {
    setTimeout(() => {
      setUserNavigate(true);
    }, 3000);
  }
  useEffect(() => {
    if (userLoggeado.status === 200) {
      localStorage.setItem('user', JSON.stringify(userLoggeado.data));
    }
  }, [userLoggeado]);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setUserLocal(JSON.parse(localStorage.getItem('user')));
    }
  }, [userLoggeado]);

  useEffect(() => {
    if (userNavigate) {
      navigate('/proyectos-caseros');
    }
  }, [navigate, userNavigate]);

  return (
    <>

    <div className='budy'>
<div class="wrapper">
<form action="">

    <h1>Ingresar</h1>
 
    <div class="input-box">
    <input type="text" placeholder="username" required />
    <i class='bx bxs-user'></i>
    </div>

    <div class="input-box">
    <input type="password" placeholder="password" required />
    <i class='bx bxs-lock-alt' ></i>
    </div>

    <div class="renember-forgot">
        <label> <input type="checkbox" /> Recordarme </label >
       
    </div>

    <a className='button'><span> Button</span><i></i></a>

    <div class="register-link">
        <p>No tienes cuenta? <Link to="/registro"><a>Registrate</a> </Link> </p>

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

export default Login;
