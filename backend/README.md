to set up the backend:

1. get SerpApi api key from https://serpapi.com/manage-api-key
2. add a new .env file and add the following variables:
   ```
       SERPAPI_KEY =
       FLASK_PORT =
       NODE_PORT =
       MONGO_USERNAME =
       MONGO_PASSWORD =
       MONGODB_NAME =
   ```
3. configure the ports for flask app and node app
4. set up a database at mongodb
5. enter the username and password in the environment variables
6. inside flask/, install the required python files using `pip install -r requirements.txt`
7. install node libraries using `npm install`
8. start the flask server using `python flask/app.py`
9. start the node server using `npm start`
