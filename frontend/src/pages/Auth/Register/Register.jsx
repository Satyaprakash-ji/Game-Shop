import { useContext, useEffect, useState } from "react"
import "./Register.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {

    const { signUp, loginData } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [ signUpFormData, setSignUpFormData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const [formInputError, setFormInputError] = useState("");

    const handleSignUpCreds = (e) => {
        const { name, value } = e.target;
            setSignUpFormData((prev) => ({...prev, [name]: value}))
    };

    const signUpHandler = async (e) => {
        e.preventDefault();
        if (
          !signUpFormData.firstName.trim() ||
          !signUpFormData.lastName.trim() ||
          !signUpFormData.email.trim() ||
          !signUpFormData.password.trim() ||
          !signUpFormData.confirmPassword.trim()
        ) {
          setFormInputError(
            "Error: Incomplete Form Submission. Please fill in all required fields."
          );
          return;
        } else if (signUpFormData.password !== signUpFormData.confirmPassword) {
          setFormInputError(
            "Error: Passwords do not match. Please ensure that the password and confirm password fields are the same."
          );
          return;
        }

        await signUp(
            signUpFormData.firstName.trim(),
            signUpFormData.lastName.trim(),
            signUpFormData.email.trim(),
            signUpFormData.password.trim(),
            signUpFormData.confirmPassword.trim()    
        );
    }

    useEffect(() => {
        if (loginData.isLoggedIn) {
          navigate(location?.state?.from || "/", { replace: true });
        }
      }, [location?.state?.from, loginData.isLoggedIn, navigate]);

    return(
        <div className="register">
            <h1 className="register-title">Register</h1>
            <form onSubmit={signUpHandler}>
                <div>
                    <input type="text" id="first-name" placeholder="First Name" name="firstName" required onChange={handleSignUpCreds} />
                </div>
                <div>
                    <input type="text" id="last-name" placeholder="Last Name" name="lastName" required onChange={handleSignUpCreds} />
                </div>
                <div>
                    <input type="email" id="email" placeholder="Email" name="email" required onChange={handleSignUpCreds} />
                </div>
                <div className="password-field">
                    <input type={showPassword.password ? "text" : "password"} id="password" placeholder="Create Password" name="password" required onChange={handleSignUpCreds} />
                    {showPassword.password ? <AiFillEye className="show-password-icon" onClick={() => setShowPassword({ ...showPassword, password: false })}/> : <AiFillEyeInvisible className="show-password-icon" onClick={() => setShowPassword({ ...showPassword, password: true })} /> }
                </div>
                <div className="confirem-password-field">
                    <input type={showPassword.confirmPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" name="confirmPassword" required onChange={handleSignUpCreds} />
                    {showPassword.confirmPassword ? <AiFillEye className="show-password-icon" onClick={() => setShowPassword({ ...showPassword, confirmPassword: false })}/> : <AiFillEyeInvisible className="show-password-icon" onClick={() => setShowPassword({ ...showPassword, confirmPassword: true })} /> }
                </div>
                <button className="register-button" type="submit">Register</button>

                <p className="existing-user">Existing User? <Link to="/login" className="login-link">Log In</Link></p>
            </form>
            {formInputError && <p className="form-input-error"> {formInputError} </p>}
            {loginData.isError && <p className="form-input-error"> {loginData.isError} </p>}
        </div>
    )
}

export default Register;