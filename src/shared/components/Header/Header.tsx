import './Header.css'
import heroImg from '../../../assets/headerImg.png'
export const Header = () => {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="SkyRoute inicio">
        <span className="brand-icon">SR</span>
        <span className="brand-name">SkyRoute</span>
      </a>

   

      <img className="header-img" src={heroImg} alt="Imagen de un avión volando entre nubes" />

    
    </header>
  )
}
