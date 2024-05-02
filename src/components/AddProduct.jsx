import {MdAdd} from 'react-icons/md'
import upload_area from '../assets/upload_area.svg'
import { useState } from 'react'

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name:"",
    image:"",
    category:"",
    new_price:"",
    old_price:""
  });

  const changeHandler =(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const imageHandle =(e)=>{
    setImage(e.target.files[0])
  }

  const ADD_Product = async()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formdata = new FormData();
    formdata.append('product',image);

    await fetch('https://dress-palette-backend-1.onrender.com/upload',{
      method:'POST',
      headers:{
        Accept:'application/json'
      },
      body:formdata,
    }).then((res)=>res.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image=responseData.image_url
      console.log(product);
      await fetch('https://dress-palette-backend-1.onrender.com/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((res)=>res.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Upload Failed ")
      })
    }
  }
  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product title:</h4>
        <input value={productDetails.name} onChange={changeHandler}  type="text" name='name' placeholder='Type here.... ' className='bg-primary outline-none max-w-80 w-full py-3 px-4  rounded-md'/>
      </div> <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Price:</h4>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here.... ' className='bg-primary outline-none max-w-80 w-full py-3 px-4  rounded-md'/>
      </div> <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Offer Price</h4>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here.... ' className='bg-primary outline-none max-w-80 w-full py-3 px-4  rounded-md'/>
      </div> 
      <div className='mb-3 flex items-center gap-x-4'>
        <h4 className='bold-18 pb-2'>Product Category:</h4>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='bg-primary ring-1 ring-slate-900/20 medium-16 outline-none rounded-sm'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} alt="" className='w-20 rounded-sm inline-block' />
        </label>
        <input onChange={imageHandle} type="file" name='image' id='file-input' className='bg-primary max-w-80 w-full py-3 px-4'  hidden/>
      </div>
      <button onClick={()=>ADD_Product()} className='btn_dark_rounded mt-4 flexCenter gap-x-1'><MdAdd/> Add Product</button>
    </div>
  )
}

export default AddProduct 