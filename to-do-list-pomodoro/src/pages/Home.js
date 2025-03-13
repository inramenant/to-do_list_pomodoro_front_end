import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-page">
      <TaskList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
