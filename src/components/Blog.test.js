import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog about testing',
  author: 'A. Uthor',
  url: 'www.testblog.com',
  likes: 1
}

test('renders blog name but no content', () => {
  render(<Blog blog={blog}/>)

  const titleElement = screen.queryByText('Blog about testing')
  expect(titleElement).toBeDefined()

  const authorElement = screen.queryByText('A. Uthor')
  expect(authorElement).toBeNull()

  const urlElement = screen.queryByText('www.testblog.com')
  expect(urlElement).toBeNull()

  const likeElement = screen.queryByText(1)
  expect(likeElement).toBeNull()
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Blog about testing',
    author: 'A. Uthor',
    url: 'www.testblog.com',
    likes: 1
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} changeViewState={mockHandler}/>
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  const titleElement = screen.queryByText('Blog about testing')
  expect(titleElement).toBeDefined()

  const authorElement = screen.queryByText('A. Uthor')
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText('www.testblog.com')
  expect(urlElement).toBeDefined()

  const likeElement = screen.queryByText(1)
  expect(likeElement).toBeDefined()

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('clicking like button adds a like', async () => {
  const blog = {
    title: 'Blog about testing',
    author: 'A. Uthor',
    url: 'www.testblog.com',
    likes: 1
  }

  const viewMockHandler = jest.fn()
  const likeMockHandler = jest.fn()

  render(
    <Blog blog={blog} changeViewState={viewMockHandler} updateBlog={likeMockHandler}/>
  )

  const viewButton = screen.getByText('view')
  userEvent.click(viewButton)

  const likeButton = screen.getByText('like')
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})