import React from 'react'
import './Footer.css'

function Footer() {
  // 动态宽度处理逻辑
  const [isSmallWindow, setIsSmallWindow] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallWindow(window.innerWidth < 768) // 小于 768px 视为小窗口
    }

    handleResize() // 初始化判断
    window.addEventListener('resize', handleResize) // 监听窗口大小变化

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <footer className={`footer ${isSmallWindow ? 'small-window' : ''}`} />
}

export default Footer
