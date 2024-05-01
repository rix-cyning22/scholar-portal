import NavBar from "../components/navbar";
import Input from "../components/input-tag";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = ({ backendPath }) => {
  const [formErr, setFormErr] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      userId: formData.get("userId"),
      gscholar: formData.get("gscholar"),
      irins: formData.get("irins"),
      orcid: formData.get("orcid"),
      password: formData.get("password"),
    };
    if (data.password !== formData.get("confPassword")) {
      setFormErr("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`${backendPath}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (response.ok) {
        setFormErr(null);
        navigate("/profile-view");
      } else {
        const error = await response.json();
        setFormErr(error.message);
      }
    } catch (error) {
      setFormErr(`Signup failed: ${error}`);
    }
  };

  return (
    <>
      <NavBar loggedIn={false} />
      <div className="container">
        {formErr ? <div className="err-msg err">{formErr}</div> : null}
        <form onSubmit={(event) => handleSubmit(event)}>
          <h2>Sign Up</h2>
          <Input inputname="userId" placeholder="ID" />
          <Input inputname="gscholar" placeholder="Google Scholar ID" />
          <Input inputname="irins" placeholder="Vidwan ID" />
          <Input inputname="orcid" placeholder="Orcid ID" />
          <Input inputname="password" placeholder="Enter Password" />
          <Input inputname="confPassword" placeholder="Confirm Password" />
          <div className="control">
            <button type="submit" className="btn-view">
              Sign Up
            </button>
            <p>
              Already a Member? <a href="/auth/login">Sign In</a>!
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
