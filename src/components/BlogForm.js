import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <form onSubmit={addBlog}>
    <div> Title 
      <input
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div> Author 
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div> Url 
      <input
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <br /> 
    <button type="submit">save</button>
  </form>  
  )
}

export default BlogForm