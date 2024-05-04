import { useNavigate } from "react-router";
import defaultUserLogo from "../default-user.jpg";

const ScholarCard = ({
  gscholarId,
  navlink = null,
  useButton = false,
  children,
}) => {
  const nav = useNavigate();
  const handleButton = () => {
    return nav(navlink);
  };
  return (
    <div className="scholar-profile">
      <img
        src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${gscholarId}&citpid=19`}
        alt={defaultUserLogo}
        onError={(e) => {
          e.target.src = defaultUserLogo;
        }}
        loading="lazy"
      />
      <div className="scholar-info">
        {children}
        {useButton ? (
          <button className="btn-view" onClick={() => handleButton()}>
            View Details
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ScholarCard;
