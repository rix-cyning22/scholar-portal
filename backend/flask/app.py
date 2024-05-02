from flask import Flask, request, jsonify
from gscholar import scrape_scholar
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)


@app.route("/getscholardetails/", methods=["POST"])
def get_scholar_details():
    req = request.json
    gscholar_details = scrape_scholar(
        req["gscholarId"], serpapi_key=os.environ.get("SERPAPI_KEY")
    )
    return jsonify(gscholar_details)


if __name__ == "__main__":
    app.run(debug=True, port=int(os.environ.get("FLASK_PORT")))
