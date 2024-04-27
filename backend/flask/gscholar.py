from serpapi import GoogleSearch
from dotenv import dotenv_values

config = dotenv_values(".env")


def scrape_scholar(author_id):
    params = {
        "engine": "google_scholar_author",
        "author_id": author_id,
        "api_key": config["SERPAPI_KEY"],
    }

    search = GoogleSearch(params)
    scholar_info = search.get_dict()
    papers = []
    for paper in scholar_info["articles"]:
        papers.append(
            {
                "title": paper["title"],
                "url": paper["link"],
                "authors": paper["authors"].split(", "),
                "year": paper["year"],
            }
        )
    collaborators = []
    for co_author in scholar_info["co_authors"]:
        collaborators.append(
            {
                "name": co_author["name"],
                "affiliations": co_author["affiliations"],
                "link": co_author["link"],
            }
        )
    return {
        **scholar_info["author"],
        "citations": scholar_info["cited_by"]["table"],
        "papers": papers,
        "co_authors": collaborators,
    }


if __name__ == "__main__":
    print(scrape_scholar("J_0lERUAAAAJ"))
