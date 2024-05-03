import { useParams } from "react-router";
import { useState } from "react";

const PageController = ({
  detCount,
  apiPath,
  setParam,
  gscholarId,
  dispCount,
}) => {
  const [page, setPage] = useState(1);
  const totPages = Math.ceil(detCount / dispCount);
  const { insttId } = useParams();
  const handlePageChange = async (pageNo) => {
    setPage(pageNo);
    const morePapers = await fetch(apiPath, {
      method: "POST",
      body: JSON.stringify({
        start: (pageNo - 1) * dispCount,
        end: pageNo * 10 > detCount ? detCount : pageNo * dispCount,
        gscholarId: gscholarId,
        insttId: insttId,
      }),
      headers: { "Content-type": "application/json" },
    });
    const morePapersData = await morePapers.json();
    console.log(morePapersData);
    setParam(morePapersData);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={i === page ? "active" : null}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };
  return <div className="page-controller">{renderPageNumbers()}</div>;
};

export default PageController;
