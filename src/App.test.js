import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom' // 导入 jest-dom
import App from './App'

test('renders Yichen Site header', () => {
  render(<App />)
  const headerElement = screen.getByText(/Yichen Site/i)
  expect(headerElement).toBeInTheDocument() // 使用 jest-dom 的扩展断言
})
