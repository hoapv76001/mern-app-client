import React, {useContext, useState} from 'react'
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
  //RegisterContext
  const {registerUser} = useContext(AuthContext)

  //local state for Form
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })

  const {username, password, confirmPassword} = registerForm

  const onChangeRegisterForm = event => setRegisterForm({
    ...registerForm,
    [event.target.name]: event.target.value
  })


  //Set local Alert message
  const [alert, setAlert] = useState(null)

  const register = async event => {
    event.preventDefault()

    //Check password and confirmPassword match?
    if(password !== confirmPassword) {
      setAlert({type: 'danger', message: 'Password not match!'})
      setTimeout(() => setAlert(null), 5000)
      return
    }
    //Check on server
    try {
      const registerData = await registerUser(registerForm)
      if(!registerData.success) {
        setAlert({type: 'danger', message: registerData.message})
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }






  return (
    <>
    <Form onSubmit={register}>
      <AlertMessage info={alert} />
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="username"
          placeholder="Your password"
          onChange={onChangeRegisterForm}
          value={username}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Your password"
          onChange={onChangeRegisterForm}
          value={password}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={onChangeRegisterForm}
          value={confirmPassword}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Đăng ký</Button>
    </Form>
    <p className="mt-3">
      Bạn đã có tài khoản?{" "}
      <Link to="/login">
        <Button variant="info">Đăng nhập</Button>
      </Link>
    </p>
  </>
  )
}

export default RegisterForm
