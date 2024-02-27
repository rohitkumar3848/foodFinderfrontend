import React, { useState,useEffect,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';



export default function (props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  let options=props.options;
  let priceOptions=Object.keys(options);
  let [qty,setQty]=useState(1);
  let [size,setSize]=useState("");
  const handleAddCart=async()=>{
      let food = []
      for (const item of data) {
        if (item.id === props.foodItem._id) {
          food = item;

          break;
        }
      }
      if (food !==0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
  
      await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
  }
  
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  })
  return (
    <div>
        <div>
          <div class="card mt-3 rounded" style={{"width": "18rem","maxHeight":"360px","fontFamily":"cursive"}}>
            <img style={{'maxHeight':'150px','objectFit':'fill'}} src={props.foodItem.img} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title fs-3"><b>{props.foodItem.foodName}</b></h5>
              <div className='container w-100'>
                    <select className='m-2 h-100  bg-danger rounded' onChange={(e)=>setQty(e.target.value)} style={{"color":"white"}}>
                      {Array.from(Array(6),(e,i)=>{
                        return (
                          <option key={i+1} value={i+1}>{i+1}</option>
                        )
                      })}
                    </select>
                    <select className='m-2 h-100  bg-danger rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)} style={{"color":"white"}}>
                          {
                            priceOptions.map((data)=>{
                              return <option key={data} value={data}>{data}</option>
                            })
                          }
                    </select>
                    <div className='d-inline h-100 fs-5'>
                    &#x20B9;{finalPrice}/-
                    </div>
              </div>
              <hr></hr>
              <button className='btn btn-success justify-center  ms-2' onClick={handleAddCart}>Add to Cart</button>
            </div>
          </div>
        </div>
    </div>
  )
}
