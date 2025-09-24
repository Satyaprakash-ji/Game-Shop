import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {

    const { loginData, logIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [logInFormData, setLogInFormData] = useState({ email: "", password: "" });
    const [formInputError, setFormInputError] = useState();
    const [showPassword, setShowPassword] = useState();
  
    const handleLoginCreds = (e) => {
      const { name, value } = e.target;
      setLogInFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const loginHandler = (e) => {
      e.preventDefault();
      if (!logInFormData.email.trim() || !logInFormData.password.trim()) {
        setFormInputError(
          "Error: Incomplete Form Submission. Please fill in all required fields."
        );
        return;
      }
      logIn(logInFormData.email.trim(), logInFormData.password.trim());
    };

    useEffect(() => {
      if (loginData.role === "admin") {
        navigate(location?.state?.from || "/admin", { replace: true });
      }
      if (loginData.role === "user") {
        navigate(location?.state?.from || "/", { replace: true });
      }
    }, [loginData.isLoggedIn, navigate, location]);

    return(
        <div className="login">
            <h1 className="login-title">Login</h1>
            <form onSubmit={loginHandler}>
                <div className="input-field">
                    <input type="email" id="email" placeholder="Email" name="email" value={logInFormData.email} onChange={handleLoginCreds} />
                </div>
                <div className="password-field">
                    <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" name="password" value={logInFormData.password} onChange={handleLoginCreds} />
                    {showPassword ? <AiFillEye className="show-password-icon" onClick={() => setShowPassword(false)}/> : <AiFillEyeInvisible className="show-password-icon" onClick={() => setShowPassword(true)} /> }
                </div>
                <button className="login-button" type="submit">Login</button><br />
                <button className="login-button" type="submit" onClick={() => setLogInFormData({email: "sprakash9120@gmail.com", password: "satya123"})}>Login as Guest</button>

                <p className="new-user">New User? <Link to="/register" className="register-link">Register</Link></p>
            </form>
            {loginData.isError && <p className="login-error"> {loginData.isError} This is error </p>}
            {formInputError && <p className="login-error"> {formInputError} This is error </p>}
        </div>
    )
}

export default Login;