const NavBar = ({ loggedIn }) => {
  return (
    <div className="navbar">
      <div className="navbar-block">
        <h1>Scholar Portal</h1>
      </div>
      <div className="navbar-block">
        {loggedIn ? (
          <>
            <div className="navbar-item">
              <a href="/auth/edit-profile">Edit Profile</a>
            </div>
            <div className="navbar-item">
              <a href="/auth/logout">Log out</a>
            </div>
          </>
        ) : (
          <div className="navbar-item">
            <a href="/auth/login">Login as a Scholar</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
