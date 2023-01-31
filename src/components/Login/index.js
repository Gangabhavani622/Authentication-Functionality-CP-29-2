// Write your JS code here
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onSuccess = token => {
    const {history} = props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  const onClickLogin = async () => {
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const token = data.jwt_token
    if (response.ok === true) {
      onSuccess(token)
    }
  }

  return (
    <div className="login-cont">
      <h1 className="heading">Please Login</h1>
      <button className="login-btn" type="button" onClick={onClickLogin}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default Login
