import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/navbar";

const ViewInfoPage = ({ backendPath }) => {
  const { insttId } = useParams();
  const [papers, setPapers] = useState([]);
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
        affiliations: iniData.affiliations,
        website: iniData.website,
        interests: iniData.interests,
        thumbnail: iniData.thumbnail,
        citations: iniData.citations,
      });
      setPapers(iniData.papers);
      setCoAuthors(iniData.coAuthors);
    };
    fetchInitialData();
  }, [backendPath, insttId]);
  return (
    <>
      <NavBar backendPath={backendPath} />
      <div className="container">
        <div className="content">
          <div className="title">
            <img src={scholarInfo.thumbnail} alt="" loading="lazy" />
            <div>
              <h2>{scholarInfo.name}</h2>
              <p className="scholar-dept">{scholarInfo.affiliations}</p>
              {scholarInfo.website ? (
                <a href={scholarInfo.website}>Website</a>
              ) : null}
            </div>
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
      </div>
    </>
  );
};

export default ViewInfoPage;
