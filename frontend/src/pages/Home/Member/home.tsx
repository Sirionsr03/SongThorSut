import { useState, useEffect } from 'react';
import { PRODUCTS } from "../../../Product";
import { Course } from "./product";

import brandner1 from "../../../assets/brandner.png";
import brandner2 from "../../../assets/Brandner2.png"; 
import brandner3 from "../../../assets/Brandner3.png";

import icons1 from "../../../icon/book.png";
import icons2 from "../../../icon/pen.png";
import icons3 from "../../../icon/shoe.png";
import icons4 from "../../../icon/electronics.png";
import icons5 from "../../../icon/shirt.png";
import icons6 from "../../../icon/skirt.png";
import icons7 from "../../../icon/pants.png";
import "./home.css";
import Navbar from '../../../Component/navbar';

const imageArray = [brandner1, brandner2, brandner3];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((Index) =>
        Index === imageArray.length - 1 ? 0 : Index + 1
      ); }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
   
    <div className='home'>
      <Navbar />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" />

      <div className='box-page'>
        <center>
          <img src={imageArray[currentImageIndex]} alt="brandner" />
        </center>
      </div>
      <div className="box-product">
        <img src={icons1} alt="icon1"/><img src={icons2} alt="icon2"/><img src={icons3} alt="icon3"/>
        <img src={icons4} alt="icon4"/><img src={icons5} alt="icon5"/><img src={icons6} alt="icon6"/><img src={icons7} alt="icon7"/>
      </div>

      <div className="Naw-arrivals">
        <p>NEW ARRIVALS</p>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Course key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;




