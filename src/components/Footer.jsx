import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-danger" >
        {/* <div className="col-md-4 d-flex align-items-center"> */}
          <span  className='fs-3 ' style={{ color: "white", textAlign: "center", display: "block", width: "100%" }}>© Food Finder</span>
        {/* </div> */}
      </footer>
    </div>
  )
}
