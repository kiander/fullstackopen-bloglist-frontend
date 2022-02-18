import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    const res = await blogService.create(blogObject)
        setBlogs(blogs.concat(res))
  }

  const updateBlog = async (blogObject) => {
    const newBlog = { ...blogObject, user: blogObject.user.id, likes: blogObject.likes+1};
    await blogService.update(blogObject.id, newBlog)

    const newBlogs = [...blogs];
    newBlogs[newBlogs.findIndex(x => x.id === blogObject.id)].likes += 1;
    setBlogs(newBlogs)
  }

  const changeBlogViewState = async(blog) => {

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  return (
  <div>
      {user === null ?
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      /> :
      <div>
        <p>{user.name} logged in</p>
        <BlogForm createBlog={addBlog}/><br /> 
        <button onClick={handleLogOut}>Logout</button> 
      </div>
    }
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} changeViewState={changeBlogViewState}/>
      )}
    </div>
  </div>
  )
}

export default App