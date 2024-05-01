const NavBar = ({ loggedIn }) => {
  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>
          <a href="/">Scholar Portal</a>
        </h1>
      </div>
      <div className="navbar-block">
        {loggedIn ? (
          <>
            <div className="navbar-item">
              <a href="/profile-view">View Profile</a>
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
