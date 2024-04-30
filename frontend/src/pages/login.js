import NavBar from "../components/navbar";

const LoginPage = ({ loggedIn }) => {
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <div className="container">
        <form>
          <h2>Log In</h2>
          <input type="text" placeholder="ID" name="userId" />
          <input type="password" placeholder="Password" name="password" />
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
