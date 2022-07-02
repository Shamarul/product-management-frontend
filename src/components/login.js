import React, { useState } from "react";
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/authServices';

export default function Login() {
    const [errorLogin, setErrorLogin] = useState('');

    const navigate = useNavigate();

    const onFinish = (values) => {
      console.log('Success:', values);
      AuthServices.login(values.username, values.password).then(
        (response) => {
            // alert(response);
            console.log(response);
            navigate('/product')
        },
        error => {
            console.log(error);
            // alert(error.response.data.message);
            setErrorLogin(error.response.data.message);
            
        }
      );
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <div style={{ display: 'flex', paddingTop: 45, justifyContent: 'center'}}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {errorLogin && <p style={{color:'red', textAlign: 'center'}}>{errorLogin}</p>}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }