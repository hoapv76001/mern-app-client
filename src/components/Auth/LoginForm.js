import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {

  //local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  //get function from context
  const {loginUser} = useContext(AuthContext)

  // destructure varient from state
  const {username, password} = loginForm

  //Set value to local state
  const onChangeLoginForm = (event) => setLoginForm({...loginForm, [event.target.name]: event.target.value})


  
  //Local state Alert

  const [alert, setAlert] = useState(null)
 

  //Login
  const login = async event => {
    event.preventDefault()
    try {
      const loginData = await loginUser(loginForm)
      if(!loginData.success) {
        setAlert({type: 'danger', message: loginData.message })
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error)      
    }

  }
 

  //return

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control 
            type="text" 
            name="username" 
            placeholder="Your user" 
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Đăng nhập</Button>
      </Form>
      <p className="mt-3">
        Dont have an account?{" "}
        <Link to="/register">
          <Button variant="info">Đăng ký</Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
