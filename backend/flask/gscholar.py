from serpapi import GoogleSearch


def scrape_scholar(author_id, serpapi_key=None):
    params = {
        "engine": "google_scholar_author",
        "author_id": author_id,
        "api_key": serpapi_key,
    }

    search = GoogleSearch(params)
    scholar_info = search.get_dict()
    try:
        scholar_info["articles"] = [
            {
                "title": paper["title"],
                "url": paper["link"],
                "authors": paper["authors"].split(", "),
                "year": paper["year"],
            }
            for paper in scholar_info["articles"]
        ]
    except:
        scholar_info["articles"] = None
    try:
        scholar_info["co_authors"] = [
            {
                "name": co_author["name"],
                "affiliations": co_author["affiliations"],
                "link": co_author["link"],
            }
            for co_author in scholar_info["co_authors"]
        ]
    except:
        scholar_info["co_authors"] = None
    scholar_info["cited_by"]["table"] = [
        {"mentions": cite[list(cite.keys())[0]]["all"], "type": list(cite.keys())[0]}
        for cite in scholar_info["cited_by"]["table"]
    ]
    scholar_info["author"]["interests"] = [
        {"title": interest["title"], "link": interest["link"]}
        for interest in scholar_info["author"]["interests"]
    ]

    return {
        **scholar_info["author"],
        "citations": scholar_info["cited_by"]["table"],
        "papers": scholar_info["articles"],
        "co_authors": scholar_info["co_authors"],
    }


if __name__ == "__main__":
    print(scrape_scholar("J_0lERUAAAAJ"))
