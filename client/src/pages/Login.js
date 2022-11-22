import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.min.css';
import { Form, Input, message } from 'antd';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../resources/Auth.css'
import axios from 'axios';
import Spinner from '../components/Spinner';



function Login() {

    const [loading,Setloading] = useState(false)


    const nevigate = useNavigate(); 

    const onFinish = async(values) => {
        // console.log('Success:', values);
        try {
            Setloading(true);
             const result = await axios.post('/api/users/login',values)   
             localStorage.setItem('monthend-db-user',JSON.stringify({...result.data,password :''}))
                Setloading(false);
             message.success("Login successful..")
            nevigate('/')

        } catch (error) {
            Setloading(false);
            message.error("Login failed");
        }

      }

      useEffect (()=>{
            if(localStorage.getItem('monthend-db-user')){
                nevigate('/');
            }
      });
//    []

  return (
    <div className='login'> 
    {loading && <Spinner />}

        <div className='row justify-content-center align-items-center w-100 h-100' >


        <div className='col-md-4' >
                <Form layout='vertical' onFinish={onFinish} >
              
                <h1>MontH EnD / LogiN </h1>
           
                    <Form.Item label='Email' name='email'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input type='password'/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                    <Link to="/register">Click here to Register</Link>
                    <button to ='/login' className='primary' >Login</button>
                    
                </div>
                </Form>
             
            </div>


            <div className='col-md-5'>

                <div className='lottyl'>
                    <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_OdVhgq.json" 
                    background="transparent"  speed="1"  loop autoplay></lottie-player>
                </div>
          
            </div>
           

        </div>
    </div>
  )
}

export default Login