import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    localStorage.setItem("user", JSON.stringify(data)); // Save user session
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input type="email" placeholder="Email" {...register("email")} required />
        <input type="password" placeholder="Password" {...register("password")} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/#/register">Register</a></p>
    </div>
  );
};

export default Login;
