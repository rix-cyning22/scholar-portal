import PageController from "./page-controller";
import ScholarCard from "./scholar";

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
            return (
              <ScholarCard key={index} gscholarId={match[1]}>
                <h4>{coAuthor.name}</h4>
                <div className="scholar-dept">{coAuthor.affiliations}</div>
              </ScholarCard>
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
