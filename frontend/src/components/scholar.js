import { useNavigate } from "react-router";

const Scholar = ({ scholar }) => {
  const nav = useNavigate();
  const handleButton = () => {
    return nav(`/view-info/${scholar.insttId}`);
  };
  return (
    <div className="scholar-profile">
      <div className="scholar-info">
        <h4>{scholar.scholarName}</h4>
        <div className="scholar-dept">{scholar.scholarDept}</div>
      </div>
      <div className="view-details">
        <button className="btn-view" onClick={() => handleButton()}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default Scholar;
