import "./Footer.css"
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return <div className="footer">
         <h6>Connect with us</h6>
         <div className="social-media">
            <NavLink to="https://www.facebook.com/"><span className="facebook"><FaFacebook/></span></NavLink>
            <NavLink to="https://x.com/Satyaprakash_ai"><span className="twitter"><FaTwitter/></span></NavLink>
            <NavLink to="https://github.com/Satyaprakash-ji"><span className="github"><FaGithub/></span></NavLink>
            <NavLink to="https://www.linkedin.com/in/satyaprakash-dev/"><span className="linkedin"><FaLinkedin/></span></NavLink>
         </div>
         <p>Made with ❣️ by Satya</p>
         
  </div>
}

export default Footer;