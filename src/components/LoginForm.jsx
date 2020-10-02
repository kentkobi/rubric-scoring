/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import usersService from '../services/users'
import tokenService from '../utils/token'

const LoginForm = ({user, setUser}) => {
    const [hasError, setHasError] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const formHandler = (event) => {
      event.preventDefault()

      usersService.login({username, password})
        .then(data => {
            tokenService.setToken(data.token)
            setUser(data)
        }
        )
        .catch(error => {
            console.log("Error:", error);
            setHasError(true)
        })
    }

    const logOut = (event) => {
        event.preventDefault();

        usersService.logout();
        setUser(null)
    }
  
    if (user) {
        return (
            <div className="row">
                <div className="eight columns">
                    <p>Logged in {user.name}</p>
                </div>
                <div className="four columns">
                    <button onClick={() => logOut()}>Logout</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {hasError && <div class="alert alert-warning" role="alert">Hmmn, we can't seem to find you... You sure about the username and password?</div>}
                <form onSubmit={formHandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" onChange={e => setUsername(e.target.value)}  placeholder="Username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input name="password" className="form-control" type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <p>Don't have an account? <a href="/register">Sign up</a></p>
            </div>
            )
    }
}

  export default LoginForm