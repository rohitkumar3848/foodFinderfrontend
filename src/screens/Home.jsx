import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const localData = async () => {
    try {
      let response =
       await fetch("https://foodfinderbackend.onrender.com/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      // console.log(responseData[0], responseData[1]);
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  useEffect(() => {
    localData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ 'objectFit': 'contain !important' }}>
        <div className="carousel-inner" style={{ 'maxHeight': '500px' }}>
          <div className='carousel-caption' style={{ 'z-index': '10' }}>
            <div className="d-flex z-10 justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{
                setSearch(e.target.value)
              }}/>
              {/* <button className="btn btn-outline-light bg-danger text-white" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700?burger" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700?pastry" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700?barbeque" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCat && foodCat.length !== 0 ?
            foodCat.map((data) => (
              <div className='row mb-3' >
                <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                <hr />
                {
                  foodItem.length !== 0 ?
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        {/* <div className='fs-3 m-3'> */}
                        {/* Assuming Card is a component */}
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        />
                        {/* </div> */}
                      </div>
                    )) :
                    <div>No Such Data Found</div>
                }
              </div>
            )) :
            <div>No Such Data Found</div>
        }
      </div>

      <div><Footer /></div>
    </div>
  )
}
