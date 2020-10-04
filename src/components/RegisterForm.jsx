/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import userService from '../services/users'
import tokenUtil from '../utils/token'

const RegisterForm = ({user, setUser}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const formHandler = (event) => {
      event.preventDefault()
    
      userService.register({name, username, password})
        .then(data => {
            tokenUtil.setToken(data.token)
            setUser(data)
        }
        )
        .catch(error => {
            setErrorMessage(error.response.data.error)
        })
    }
  
    if (user) {
        return (
            <div className="row">
                <div className="eight columns">
                    <p>Logged in {user.name}</p>
                </div>
                <div className="four columns">
                    <button onClick={() => setUser(null)}>Logout</button>
                </div>
            </div>
        )
    } else {
        return (
            <form onSubmit={formHandler}>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" onChange={e => setName(e.target.value)}  placeholder="Name" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Company</label>
                    <input type="text" className="form-control" name="company" onChange={e => setName(e.target.value)}  placeholder="Company" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" onChange={e => setUsername(e.target.value)}  placeholder="Username" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input name="password" className="form-control" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            )
    }
}

  export default RegisterForm