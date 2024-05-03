import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/navbar";
import PapersSection from "../components/papers-section";
import CoAuthorsSection from "../components/coauthors-section";
import defaultUserLogo from "../default-user.jpg";

const ViewInfoPage = ({ backendPath }) => {
  const { insttId } = useParams();
  const [papers, setPapers] = useState([]);
  const [totPaperCount, setTotPaperCount] = useState(0);
  const [coAuthorsCount, setCoAuthorsCount] = useState(0);
  const [coAuthors, setCoAuthors] = useState([]);
  const [scholarInfo, setScholarInfo] = useState({});
  useEffect(() => {
    const fetchInitialData = async () => {
      const initial = await fetch(`${backendPath}/scholar/scholar-info`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ insttId: insttId }),
        headers: { "Content-type": "application/json" },
      });
      const iniData = await initial.json();
      setScholarInfo({
        name: iniData.name,
        gscholarId: iniData.gscholarId,
        vidwanId: iniData.vidwanId,
        orcidId: iniData.gscholarId,
        affiliations: iniData.affiliations,
        website: iniData.website,
        interests: iniData.interests,
        thumbnail: iniData.thumbnail,
        citations: iniData.citations,
      });
      setPapers(iniData.papers);
      setCoAuthors(iniData.co_authors);
      setTotPaperCount(iniData.papersCount);
      setCoAuthorsCount(iniData.co_authorsCount);
    };
    fetchInitialData();
  }, [backendPath, insttId]);
  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="container">
        <div className="content">
          <div className="title">
            <img
              src={scholarInfo.thumbnail}
              alt={defaultUserLogo}
              onError={(e) => {
                e.target.src = defaultUserLogo;
              }}
            />
            <div>
              <h2>{scholarInfo.name}</h2>
              <p className="scholar-dept">{scholarInfo.affiliations}</p>
              <div className="interests">
                {scholarInfo.website ? (
                  <a href={scholarInfo.website}>Website</a>
                ) : null}
                <a
                  href={`https://scholar.google.com/citations?user=${scholarInfo.gscholarId}&hl=en&oi=ao`}
                >
                  Google Scholar
                </a>
                <a
                  href={`https://iitism.irins.org/profile/${scholarInfo.vidwanId}`}
                >
                  IRINS
                </a>
                <a href={`https://orcid.org/${scholarInfo.orcidId}`}>ORCID</a>
              </div>
              <div className="interests">
                {scholarInfo.interests
                  ? scholarInfo.interests.map((interest, index) => {
                      return (
                        <a href={interest.link} key={index}>
                          {interest.title}
                        </a>
                      );
                    })
                  : null}
              </div>
            </div>
            <table className="citations">
              <tbody>
                {scholarInfo.citations
                  ? scholarInfo.citations.map((cite, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <b>{cite.type}</b>
                          </td>
                          <td>{cite.mentions}</td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
          <PapersSection
            backendPath={backendPath}
            papers={papers}
            totPaperCount={totPaperCount}
            setPapers={setPapers}
            gscholarId={scholarInfo.gscholarId}
          />
          <CoAuthorsSection
            backendPath={backendPath}
            coAuthors={coAuthors}
            totCoAuthorCount={coAuthorsCount}
            setCoAuthors={setCoAuthors}
            gscholarId={scholarInfo.gscholarId}
          />
        </div>
      </div>
    </>
  );
};

export default ViewInfoPage;
