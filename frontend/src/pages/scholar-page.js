import NavBar from "../components/navbar";

const ScholarPage = ({ loggedIn }) => {
  const scholars = [
    {
      name: "Prasanta K. Jana",
      deptId: 1,
    },
    {
      name: "VMSR Murthy",
      deptId: 2,
    },
  ];
  const depts = {
    1: "Department of Computer Science and Engineering",
    2: "Department of Mining Engineering",
  };
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <div className="container">
        <div className="scholar-heading">filter search</div>
        <div className="scholar-list">
          {scholars.map((scholar) => {
            return (
              <div className="scholar-profile">
                <div className="scholar-info">
                  <h4>{scholar.name}</h4>
                  <div className="scholar-dept">{depts[scholar.deptId]}</div>
                </div>
                <div className="view-details">
                  <button className="btn-view">View Details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ScholarPage;
