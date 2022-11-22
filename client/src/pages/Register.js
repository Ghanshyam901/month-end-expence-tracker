import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.min.css';
import { Form, Input, message } from 'antd';
// import Input from 'antd/lib/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/Auth.css'
import axios from 'axios';
import Spinner from '../components/Spinner';



function Register() {
    const [loading,Setloading] = useState(false)
    const nevigate = useNavigate(true); 

    const onFinish = async (values) => {
        try {  
            Setloading(true);
            await axios.post('/api/users/register',values)
            Setloading(false)
            message.success("Regestration successfull");
        } catch (error) {
            Setloading(false);
            message.error("something went wrong")
        }
      }

      useEffect (()=>{
        if(localStorage.getItem('monthend-db-user')){
            nevigate('/');
        }

  },[]);
   

  return (
    <div className='register'> 
    {loading && <Spinner/>}

        <div className='row justify-content-center align-items-center w-100 h-100' >

            <div className='col-md-5'>

                <div className='lottyr'>
                    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_OdVhgq.json" 
                    background="transparent"  speed="1"   loop autoplay></lottie-player>
                </div>
          
            </div>
            <div className='col-md-4' >
                <Form layout='vertical' onFinish={onFinish} >
              
                <h1>MontH EnD / RegisteR </h1>
            
                    <Form.Item label='Name' name='name' >
                        <Input/>
                    </Form.Item>

                    <Form.Item label='Email' name='email'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                    <Link to="/login">Already have an account, click here to login</Link>
                    <button to ='/login' className='primary' >Register</button>
                    
                </div>
                </Form>
             
            </div>

        </div>
    </div>
  )
}

export default Register