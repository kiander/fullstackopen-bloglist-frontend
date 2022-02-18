import { useState } from 'react'

const Blog = ({blog, updateBlog, changeViewState}) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const divStyle = {
    width: '400px',
    border:'thick solid',
    padding: '10px'
  }

  const infoHandler = () => {
    setBlogInfoVisible(!blogInfoVisible)
    changeViewState(blog)
  }

  const handleLike = () => {
    updateBlog(blog);
  }

  return(
  <div style={divStyle} className='blog'>
    <div>{blog.title}</div>
    {blogInfoVisible === true ?
      <div>
        <button onClick={infoHandler}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
      </div> :
      <div>
        <button onClick={infoHandler}>view</button>
      </div>
    }
  </div>  
)}

export default Blog
