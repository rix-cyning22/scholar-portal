from flask import Flask, request, jsonify
from gscholar import scrape_scholar
from dotenv import dotenv_values

app = Flask(__name__)
config = dotenv_values(".env")


@app.route("/getscholardetails/", methods=["POST"])
def get_scholar_details():
    req = request.json
    gscholar_details = scrape_scholar(req["gscholar_id"])
    irins_details = None
    orcid_details = None
    return jsonify(
        {
            "gscholar": gscholar_details,
            "orcid": orcid_details,
            "irins": irins_details,
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=config["FLASK_PORT"])
