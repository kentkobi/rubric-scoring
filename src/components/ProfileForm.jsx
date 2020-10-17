/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import userService from '../services/users'
import tokenUtil from '../utils/token'

const RegisterForm = ({user, setUser}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState(user.name)
    const [avatar, setAvatar] = useState(user.avatar)
    const [password, setPassword] = useState('')

    const formHandler = (event) => {
      event.preventDefault()
    
      userService.edit({name, avatar, password})
        .then(data => {
            tokenUtil.setToken(data.token)
            setUser(data)
        }
        )
        .catch(error => {
            setErrorMessage(error.response.data.error)
        })
    }
  
    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={formHandler}>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" defaultValue={user.name} onChange={e => setName(e.target.value)}  placeholder="Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input name="password" className="form-control" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    )
}

  export default RegisterForm