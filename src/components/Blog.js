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









// import { useState } from 'react'

// const Blog = ({ blog, updateBlog, viewChange }) => {
//   const [infoVisible, setInfoVisible] = useState(false)

// const infoHandler = () => {
//   setInfoVisible(!infoVisible)
//   viewChange(blog)
// }

// const handleLike = () => {
//   updateBlog(blog)
// };

//   return (
//     <div>

//       <div className='blog'>
//       {infoVisible === false ?
//       <div><div>{blog.title}</div><button onClick={infoHandler}>View</button></div> :
//       <div><div>{blog.title}</div><div>{blog.url}</div><div>{blog.likes}</div> <div>{blog.author}</div> <button onClick={infoHandler}>Hide</button></div>
//       }
//       </div>
//       <button onClick={handleLike}>Like</button>
//     </div>
//   )
// }

// export default Blog