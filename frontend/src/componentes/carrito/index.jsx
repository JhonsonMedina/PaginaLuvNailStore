import '../carrito/css/main.css'

   

const Index = () => {

    let productos = [];

    fetch("/e-commerce-desde-cero/resultado-final/js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
        })
    
        const openMenu = document.querySelector("#open-menu");
        const closeMenu = document.querySelector("#close-menu");
        const aside = document.querySelector("aside");
    const contenedorProductos = document.querySelector("#contenedor-productos");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    let botonesAgregar = document.querySelectorAll(".producto-agregar");
    const numerito = document.querySelector("#numerito");


    openMenu.addEventListener("click", () => {
        aside.classList.add("aside-visible");
    })
    
    closeMenu.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
    })
    
    
    botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
        aside.classList.remove("aside-visible");
    }))
    
    
    function cargarProductos(productosElegidos) {
       contenedorProductos.innerHTML = "";
        productosElegidos.forEach(producto => {
         const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img className="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" />
                <div className="producto-detalles">
                    <h3 className="producto-titulo">${producto.titulo}</h3>
                    <p className="producto-precio">$${producto.precio}</p>
                    <button className="producto-agregar" id="${producto.id}">Agregar</button>
                </div>
            `;
    
            contenedorProductos.append(div);
        })
    
        actualizarBotonesAgregar();
    }
    
         //Para presionar en las barras Izquierdas
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
                                            // se usa para marcarlo uno por uno
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
    
            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos);
            }
    
        })
    });
    
    function actualizarBotonesAgregar() {
        botonesAgregar = document.querySelectorAll(".producto-agregar");
    
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }
    
    let productosEnCarrito;
    
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    } else {
        productosEnCarrito = [];
    }
    
    function agregarAlCarrito(e) {
    
        Toastify({
            text: "Producto agregado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #4b33a8, #785ce9)",
              borderRadius: "2rem",
              textTransform: "uppercase",
              fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();
    
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);
    
        if(productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
    
        actualizarNumerito();
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
    
    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }
    return (
        <>

   <div className="wrapper">
        <header className="header-mobile">
            <h1 className="logo">CarpiShop</h1>
            <button className="open-menu" id="open-menu">
                <i className="bi bi-list"></i>
            </button>
        </header>
        <aside>
            <button className="close-menu" id="close-menu">
                <i className="bi bi-x"></i>
            </button>
            <header>
                <h1 className="logo">LuvNailStore</h1>
            </header>
            <nav>
                <ul className="menu">
                    <li>
                        <button id="todos" className="boton-menu boton-categoria active"><i className="bi bi-hand-index-thumb-fill"></i> Todos los productos</button>
                    </li>
                    <li>
                        <button id="abrigos" className="boton-menu boton-categoria"><i className="bi bi-hand-index-thumb"></i> Abrigos</button>
                    </li>
                    <li>
                        <button id="camisetas" className="boton-menu boton-categoria"><i className="bi bi-hand-index-thumb"></i> Camisetas</button>
                    </li>
                    <li>
                        <button id="pantalones" className="boton-menu boton-categoria"><i className="bi bi-hand-index-thumb"></i> Pantalones</button>
                    </li>
                    <li>
                        <a className="boton-menu boton-carrito" href="./carrito.html">
                            <i className="bi bi-cart-fill"></i> Carrito <span id="numerito" className="numerito">0</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <footer>
                <p className="texto-footer">© 2024 LuvNailStore</p>
            </footer>
        </aside>
        <main>
            <h2 className="titulo-principal" id="titulo-principal">Todos los productos</h2>
            <div id="contenedor-productos" className="contenedor-productos">
              
            </div>
        </main>
    </div>
    
    </>
    )
}

export default Index;
