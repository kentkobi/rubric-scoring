import React, { useState, useEffect } from "react";

/* services */
import postService from './services/posts'

/* components */
import UserCardCompact from "./components/UserCardCompact"
import PostList from "./components/PostList"

/* modules */
import SideNav from "./modules/SideNav"
import Navbar from "./modules/Navbar"
import TrendingTags from "./modules/TrendingTags"
import WhoToFollow from "./modules/WhoToFollow"

/* user content sections */
import Explore from "./pages/Explore"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Follows from "./pages/Follows"
import Likes from "./pages/Likes"
import SignUp from "./pages/SignUp"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"


const App = () => {
  
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const addPost = (newPost) => {
    postService.create(newPost, user)
      .then(data => {
        setPosts([data, ...posts])
      })
  }

  useEffect(() => {
    postService.getAll()
    .then((posts) => {
        setPosts(posts)
    })
  }, [])

  return (
      <Router>
        <div className="container-fluid">
          <div className="row min-vh-100">
          
            <nav id="site-sidenav" className="col-md-2 p-0 bg-dark flex-grow-1">
              {user !== null  && <UserCardCompact user={user}/>}
              <SideNav user={user} setUser={setUser}/>
            </nav>
            
            <main className="col p-0 bg-light">
              <Navbar user={user} setUser={setUser} />
              <Switch>
                <Route path="/profile">
                  {user === null ? <Redirect to="/register" /> : <EditProfile user={user} setUser={setUser}/>}
                </Route>
                <Route path="/register">
                  {user !== null ? <Redirect to="/" /> : <SignUp user={user} setUser={setUser}/>}
                </Route>
                <Route path="/tags/:tag">
                  <PostList posts={posts} user={user}/>
                </Route>
                <Route path="/mentions/:mention">
                  <PostList posts={posts} user={user}/>
                </Route>
                <Route path="/users/:username">
                  <Profile user={user} setUser={setUser} addPost={addPost}/>
                </Route>
                <Route path="/:username/follows">
                  <Follows user={user} setUser={setUser} addPost={addPost}/>
                </Route>
                <Route path="/:username/likes">
                  <Likes user={user} setUser={setUser} addPost={addPost}/>
                </Route>
                <Route path="/">
                  <Explore user={user} setUser={setUser} posts={posts} setPosts={setPosts} addPost={addPost}/>
                </Route>
              </Switch>
            </main>

            <aside className="col-md-3 p-0 bg-light border-left">
              <WhoToFollow user={user} setUser={setUser}/>
              <TrendingTags/>
            </aside>
          </div>
        </div>
      </Router>
  );
}

export default App;
