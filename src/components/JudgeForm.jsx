/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import userService from '../services/users'
import tokenUtil from '../utils/token'

const JudgeForm = ({user, setUser, addJudge}) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState(''+(Math. floor(Math. random() * 10000) + 10000))

    const formHandler = (event) => {
        event.preventDefault()
    
        addJudge({
            name: name,
            username: username,
            company: company,
            password: password
        })
        setName('')
        setUsername('')
        setCompany('')
        setPassword( ''+(Math. floor(Math. random() * 10000) + 10000) )
    }
  
    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={formHandler}>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" defaultValue={name} onChange={e => setName(e.target.value)}  placeholder="Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email</label>
                        <input type="email" className="form-control" name="username" defaultValue={username} onChange={e => setUsername(e.target.value)}  placeholder="name@company.com" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Company</label>
                        <input type="text" className="form-control" name="company" defaultValue={company} onChange={e => setCompany(e.target.value)}  placeholder="Company" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Generated Password</label>
                        <input name="password" className="form-control" type="text" defaultValue={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Judge</button>
                </form>
            </div>
        </div>
    )
}

  export default JudgeForm