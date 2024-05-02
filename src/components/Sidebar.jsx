import React from 'react'
import { Link } from 'react-router-dom'
import listProduct from '../assets/productlist.png'
import addProduct from '../assets/addproduct.png'



const Sidebar = () => {
  return (
   <div className='py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6'>
    <Link to={'/addproduct'} >
        <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 medium-16 xs:w-44'>
            <img src={addProduct} height={44} width={44} alt="" />
            <span>Add Product</span>
        </button>
    </Link>
     <Link to={'/listproduct'} >
        <button className='flexCenter gap-2 rounded-md bg-primary h-12 w-40 medium-16 xs:w-44'>
            <img src={listProduct} height={44} width={44} alt="" />
            <span>Product List</span>
        </button>
    </Link>
   </div>
  )
}

export default Sidebar