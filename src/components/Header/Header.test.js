import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // 导入 jest-dom
import Header from './Header'

test('renders header with provided title', () => {
  const title = 'Test Title'
  render(<Header title={title} />)
  const headerElement = screen.getByText(/Test Title/i)
  expect(headerElement).toBeInTheDocument() // 使用 jest-dom 的扩展断言
})
