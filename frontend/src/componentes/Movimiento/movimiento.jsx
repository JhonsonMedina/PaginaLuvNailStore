import './movimiento.css'
import img1 from '../../assets/imgf/abrigos/1.png'
import img2 from '../../assets/imgf/abrigos/2.png'
import img3 from '../../assets/imgf/abrigos/3.png'
import img4 from '../../assets/imgf/abrigos/4.png'


const Movimiento = () => {
    return (
        <>


<div className="slider">

<div className="slider-track">

  <div className="slide">
    <img src={img1} alt="" />
  </div>  
  <div className="slide">
    <img src={img2} alt="" />
  </div>  
  <div className="slide">
    <img src={img3} alt="" />
  </div>  
  <div className="slide">
    <img src={img4} alt="" />
  </div>  
  <div className="slide">
    <img src={img1} alt="" />
  </div>  
  <div className="slide">
    <img src={img2} alt="" />
  </div>  
  <div className="slide">
    <img src={img3} alt="" />
  </div>  
  <div className="slide">
    <img src={img4} alt="" />
  </div> 
  <div className="slide">
    <img src={img1} alt="" />
  </div>  
  <div className="slide">
    <img src={img2} alt="" />
  </div>  
  <div className="slide">
    <img src={img3} alt="" />
  </div>  
  <div className="slide">
    <img src={img4} alt="" />
  </div>  
  
 

  </div>
</div>
</>
    )
}

export default Movimiento;