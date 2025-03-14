import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/Register.css'

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    navigate("/login");
  };

  return (
    <div className="form-container">
  <h2>Register</h2>
  <form onSubmit={handleSubmit(onSubmit)} className="form">
    <input type="text" placeholder="Username" {...register("username")} required />
    <input type="email" placeholder="Email" {...register("email")} required />
    <input type="password" placeholder="Password" {...register("password")} required />
    <button type="submit">Register</button>
  </form>
  <p>Already have an account? <Link to="/login">Login</Link></p>
</div>
  );
};

export default Register;
