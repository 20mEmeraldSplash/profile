import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import '../../styles/variables.css' // 引入 CSS 变量

function Header({ title }) {
  const [currentTime, setCurrentTime] = useState('')

  // 更新时间的逻辑
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const day = now.toLocaleDateString('en-US', { weekday: 'short' }) // 如 "Sat"
      const date = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }) // 如 "Nov 30"
      const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // 使用 12 小时制
      }) // 如 "12:26 PM"
      setCurrentTime(`${day} ${date}    ${time}`) // 拼接日期和时间
    }

    updateTime() // 初始化时间
    const interval = setInterval(updateTime, 1000) // 每秒更新

    return () => clearInterval(interval) // 清除定时器
  }, [])

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
      <div style={styles.time}>{currentTime}</div>
    </header>
  )
}

const styles = {
  header: {
    width: '100%',
    height: 'var(--header-height)',
    backgroundColor: 'var(--super-light-gray)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // 左右对齐
    padding: '0 16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    color: 'var(--black)',
    fontWeight: 'normal',
  },
  time: {
    fontSize: '14px',
    color: 'var(--black)',
    fontWeight: 'lighter',
  },
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
