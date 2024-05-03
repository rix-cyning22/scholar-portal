import PageController from "./page-controller";
import defaultUserLogo from "../default-user.jpg";

const CoAuthorsSection = ({
  coAuthors,
  setCoAuthors,
  backendPath,
  totCoAuthorCount,
  gscholarId,
}) => {
  return (
    <div className="details-section">
      <div className="section-header">
        <div className="section-title">
          <h3>CoAuthors</h3>
        </div>
        <PageController
          detCount={totCoAuthorCount}
          setParam={setCoAuthors}
          apiPath={`${backendPath}/scholar/more-coauthors`}
          gscholarId={gscholarId}
          dispCount={8}
        />
      </div>
      <div className="scholar-list">
        {coAuthors ? (
          coAuthors.map((coAuthor, index) => {
            const regex = /user=([a-zA-Z0-9_-]+)/;
            const match = coAuthor.link.match(regex);
            const extractedText = match[1];
            return (
              <div className="scholar-profile" key={index}>
                <img
                  src={`https://scholar.googleusercontent.com/citations?view_op=view_photo&user=${extractedText}&citpid=19`}
                  alt={defaultUserLogo}
                  onError={(e) => {
                    e.target.src = defaultUserLogo;
                  }}
                />
                <div className="scholar-info">
                  <a href={coAuthor.link}>{coAuthor.name}</a>
                  <p className="scholar-dept">{coAuthor.affiliations}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No co-author found. </p>
        )}
      </div>
    </div>
  );
};

export default CoAuthorsSection;
