import { useParams } from "react-router";
import { useState } from "react";

const PageController = ({ totDetailsCount, apiPath, setParam, gscholarId }) => {
  const [page, setPage] = useState(1);
  const totPages =
    parseInt(totDetailsCount / 10) < 1 ? 1 : parseInt(totDetailsCount / 10);
  const { insttId } = useParams();
  const handlePageChange = async (pageNo) => {
    setPage(pageNo);
    const morePapers = await fetch(apiPath, {
      method: "POST",
      body: JSON.stringify({
        start: (pageNo - 1) * 10,
        end: pageNo * 10 > totDetailsCount ? totDetailsCount : pageNo * 10,
        gscholarId: gscholarId,
        insttId: insttId,
      }),
      headers: { "Content-type": "application/json" },
    });
    const morePapersData = await morePapers.json();
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
