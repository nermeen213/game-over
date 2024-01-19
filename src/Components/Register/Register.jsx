import React, { useContext, useState } from 'react';
import style from './Register.module.css';
import photo from '../../Assets/images/gaming.ebaf2ffc84f4451d.jpg'
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import {Audio} from 'react-loader-spinner'
import { userToken } from '../Context/UserToken';

export default function Register() {
 
   let navigate=useNavigate();
   const [loading, setloading] = useState(false)
   const [error, seterror] = useState(null)
    let phoneRegex =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    let emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
  async function register(values){
    try {
      setloading(true)
      let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
     
      if(data.message=="success"){
        setloading(false);
       
        navigate('/login')
       }
    } catch (error) {
      seterror(error.response.data.message)
     
    }
  
  }
  let validation =Yup.object({
    name:Yup.string().min(3 , 'name minlength is 3').max(10 ,'name max is 10 ').required('name is required'),
    email:Yup.string().matches(emailRegex ,'email is invalid').required('email is required'),
    password:Yup.string().matches(passwordRegex , 'Minimum eight characters, atleast one letter and one number:').required('password is required'),
  
    rePassword:Yup.string().oneOf([Yup.ref('password')], 'password and rePassword not match').required('rePassword is requird'),
    phone:Yup.string().matches(phoneRegex,'phone is invalid').required('phone is required')
  
   })
  
  let formik = useFormik({
   initialValues :{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
   },
    validationSchema:validation
   ,onSubmit:register
  })
  








    
    return (
        <>
        <div className=' row g-0  mx-auto  layer register-div mt-5  '>
          <div className="col-md-6">
            <img src={photo} className='w-100 h-100 ' alt="" />
          </div>
          <div className="col-md-6 text-center py-3 ">
          <div>
                <h3 className='text-light pb-3 '>Create an account</h3>
                {error!==null? <p className='text-danger'>{error}</p>:""}
               
          </div>
            <form onSubmit={formik.handleSubmit}>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" className='w-75 mx-auto form-control my-2 ' name="name" placeholder="username"/>
               {formik.errors.name&&formik.touched.name?<p className='text-danger p-0 m-0 '>{formik.errors.name}</p>:""}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" className='w-75 mx-auto form-control my-2' name="email" placeholder="Enter Your Email"/>
                {formik.errors.email&&formik.touched.email?<p className='text-danger '>{formik.errors.email}</p>:""}
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" className='w-75 mx-auto form-control my-2' name="password" placeholder="Password"/>
                {formik.errors.password&&formik.touched.password?<p className='text-danger '>{formik.errors.password}</p>:""}

                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" className='w-75 mx-auto form-control my-2' name="rePassword" placeholder="rePassword"/>
                {formik.errors.rePassword&&formik.touched.rePassword?<p className='text-danger '>{formik.errors.rePassword}</p>:""}

                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" className='w-75 mx-auto form-control my-2' name='phone' placeholder="Phone"/>
                {formik.errors.phone&&formik.touched.phone?<p className='text-danger '>{formik.errors.phone}</p>:""}

                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  w-75 background'>Sign in</button> <Link to={'/login'} className='btn text-light'>Already have an account?</Link>
            </form>
          </div>

        </div>
           
        </>
    )
}
