const Scholar = ({ scholar }) => {
  return (
    <div className="scholar-profile">
      <div className="scholar-info">
        <h4>{scholar.scholarName}</h4>
        <div className="scholar-dept">{scholar.scholarDept}</div>
      </div>
      <div className="view-details">
        <button className="btn-view">View Details</button>
      </div>
    </div>
  );
};

export default Scholar;
