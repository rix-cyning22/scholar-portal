import PageController from "./page-controller";

const PapersSection = ({
  papers,
  setPapers,
  backendPath,
  totPaperCount,
  gscholarId,
}) => {
  return (
    <div className="details-section">
      <div className="section-header">
        <div className="section-title">
          <h3>Papers</h3>
        </div>
        <PageController
          totDetailsCount={totPaperCount}
          setParam={setPapers}
          apiPath={`${backendPath}/scholar/more-papers`}
          gscholarId={gscholarId}
        />
      </div>
      {papers.map((paper, index) => {
        return (
          <div className="section-row" key={index}>
            <a href={paper.url}>{paper.title}</a>
            <div className="interests scholar-dept">
              {paper.authors.map((coAuthor, index) => {
                return <p key={index}>{coAuthor}</p>;
              })}
              <p>({paper.year})</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PapersSection;
