import NavBar from "../components/navbar";
import Input from "../components/input-tag";

const SignupPage = ({ loggedIn }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name);
  };
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <Input inputname="userId" placeholder="ID" />
          <Input inputname="name" placeholder="Name" />
          <Input inputname="gscholar" placeholder="Google Scholar ID" />
          <Input inputname="irins" placeholder="Vidwan ID" />
          <Input inputname="orcid" placeholder="Orcid ID" />
          <Input inputname="password" placeholder="Enter Password" />
          <Input inputname="password" placeholder="Confirm Password" />
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
