import PageController from "./page-controller";

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
          totDetailsCount={totCoAuthorCount}
          setParam={setCoAuthors}
          apiPath={`${backendPath}/scholar/more-coauthors`}
          gscholarId={gscholarId}
        />
      </div>
      {coAuthors.map((coAuthor, index) => {
        return (
          <div className="section-row" key={index}>
            <a href={coAuthor.link}>{coAuthor.name}</a>
            <p className="scholar-dept">{coAuthor.affiliations}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CoAuthorsSection;
