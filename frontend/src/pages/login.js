import NavBar from "../components/navbar";
import Input from "../components/input-tag";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = ({ backendPath }) => {
  const [formErr, setFormErr] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        userId: event.target.userId.value,
        password: event.target.password.value,
      };
      console.log(data);
      const response = await fetch(`${backendPath}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setFormErr(null);
        navigate("/profile-view");
      } else {
        const err = await response.json();
        setFormErr(err.message);
      }
    } catch (error) {
      setFormErr(`${error}`);
    }
  };
  return (
    <>
      <NavBar loggedIn={false} />
      <div className="container">
        {formErr ? <div className="err-msg err">{formErr}</div> : null}
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <Input inputname="userId" placeholder="ID" />
          <Input inputname="password" placeholder="Password" />
          <div className="control">
            <button className="btn-success" type="submit">
              Log In
            </button>
            <p>
              new to the portal? <a href="/auth/signup">Sign Up</a>!
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
