import React from 'react'
import AppIcon from '../AppIcon/AppIcon'
import EaseStarLogo from '../../assets/logos/adaptive-icon.png'
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

  return (
    <footer className={`footer ${isSmallWindow ? 'small-window' : ''}`}>
      <a
        href="https://apps.apple.com/us/app/easestar/id6471627227"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AppIcon src={EaseStarLogo} alt="EaseStar App Icon" />
      </a>
    </footer>
  )
}

export default Footer
