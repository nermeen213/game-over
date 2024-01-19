import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import photo from '../../Assets/images/gaming.ebaf2ffc84f4451d.jpg'
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { userToken } from '../Context/UserToken';

export default function Login() {
  let{setToken ,Token}=useContext(userToken)
   let navigate=useNavigate();
   const [error, seterror] = useState(null)
    let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
  async function login(values){
    try {
      
      let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
     
      if(data.message=="success"){
       
        localStorage.setItem('newToken',data.token)
        setToken(localStorage.getItem('newToken'))
        navigate('/')
       }
    } catch (error) {
      seterror(error.response.data.message)
      
    }
  
  }
  let validation =Yup.object({
    email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
    password:Yup.string().matches(passwordRegex , 'Minimum eight characters, atleast one letter and one number:').required('password is required'),

   })
  
  let formik = useFormik({
   initialValues :{
    email:"",
    password:"",
   },
    validationSchema:validation
   ,onSubmit:login
  })
  








    
    return (
        <>
        <div className=' row g-0  mx-auto  layer register-div mt-5  '>
          <div className="col-md-6">
            <img src={photo} className='w-100 h-100 ' alt="" />
          </div>
          <div className="col-md-6 text-center py-3 ">
          <div>
                <h3 className='text-light pb-3 '>Login Now</h3>
                {error!==null? <p className='text-danger'>{error}</p>:""}
               
          </div>
            <form onSubmit={formik.handleSubmit}>
                
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='w-75 mx-auto form-control my-3' name="email" placeholder="Enter Your Email"/>
                {formik.errors.email&&formik.touched.email?<p className='text-danger '>{formik.errors.email}</p>:""}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='w-75 mx-auto form-control my-3' name="password" placeholder="Password"/>
                {formik.errors.password&&formik.touched.password?<p className='text-danger '>{formik.errors.password}</p>:""}

              
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  w-75 background'>login </button><Link to={'/register'} className='btn text-light'>Dont,t have an account? Register Now</Link>
            </form>
          </div>

        </div>
           
        </>
    )
}
