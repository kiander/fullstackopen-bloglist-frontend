import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [blogs, setBlogs] = useState({})
  const [blogInfoVisible, setblogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const divStyle = {
    width: '400px',
    border:'thick solid',
    padding: '10px'
  }

  const addLike = (event) => {
    event.preventDefault()
    blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1})
  }

  return(
  <div style={divStyle}>
    <div>
      {blog.title}
    </div>
    <div style={showWhenVisible}>
      <button onClick={() => setblogInfoVisible(blogInfoVisible => !blogInfoVisible)}>hide</button>
      <div>{blog.url}</div>
      <div>{blog.likes}<button onClick={addLike}>like</button></div>
      <div>{blog.author}</div>
    </div>
    <div style={hideWhenVisible}>
      <button onClick={() => setblogInfoVisible(blogInfoVisible => !blogInfoVisible)}>view</button>
    </div>

  </div>  
)}

export default Blog