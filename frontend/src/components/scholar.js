import { useNavigate } from "react-router";

const ScholarCard = ({ scholar }) => {
  const nav = useNavigate();
  const handleButton = () => {
    return nav(`/view-info/${scholar.insttId}`);
  };
  console.log(scholar);
  return (
    <div className="scholar-profile">
      <div className="title">
        <img
          src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${scholar.gscholarId}&citpid=19`}
          alt=""
        />
        <div className="scholar-info">
          <h4>{scholar.scholarName}</h4>
          <div className="scholar-dept">{scholar.scholarDept}</div>
          <button className="btn-view" onClick={() => handleButton()}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarCard;
