import PageController from "./page-controller";

const PapersSection = ({
  papers,
  setPapers,
  backendPath,
  totPaperCount,
  gscholarId,
}) => {
  console.log(totPaperCount);
  return (
    <div className="details-section">
      <div className="section-header">
        <div className="section-title">
          <h3>Papers</h3>
        </div>
        <PageController
          detCount={totPaperCount}
          setParam={setPapers}
          apiPath={`${backendPath}/scholar/more-papers`}
          gscholarId={gscholarId}
          dispCount={10}
        />
      </div>
      {papers ? (
        papers.map((paper, index) => {
          return (
            <div className="section-row" key={index}>
              <a href={paper.url}>
                {paper.title} ({paper.year})
              </a>
              <div className="interests scholar-dept">
                {paper.authors.map((coAuthor, index) => {
                  return <p key={index}>{coAuthor}</p>;
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p>No paper found</p>
      )}
    </div>
  );
};

export default PapersSection;
