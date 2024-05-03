import { useNavigate } from "react-router";
import defaultUserLogo from "../default-user.jpg";

const ScholarCard = ({ scholar }) => {
  const nav = useNavigate();
  const handleButton = () => {
    return nav(`/view-info/${scholar.insttId}`);
  };
  return (
    <div className="scholar-profile">
      <img
        src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${scholar.gscholarId}&citpid=19`}
        alt={defaultUserLogo}
        onError={(e) => {
          e.target.src = defaultUserLogo;
        }}
        loading="lazy"
      />
      <div className="scholar-info">
        <h4>{scholar.name}</h4>
        <div className="scholar-dept">{scholar.dept}</div>
        <button className="btn-view" onClick={() => handleButton()}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ScholarCard;
