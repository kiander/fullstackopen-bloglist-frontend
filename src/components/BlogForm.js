import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [addBlogVisible, setAddBlogVisible] = useState(false)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id='add-blog-button' onClick={() => setAddBlogVisible(true)}>Add Blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
        <div> Title 
          <input id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div> Author 
          <input id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div> Url 
          <input id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br /> 
        <button id='save-blog-button' type="submit">save</button>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm