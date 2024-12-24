from dotenv import load_dotenv
import psycopg2 
import os

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

conn = psycopg2.connect(
    f"dbname={DB_NAME} user={DB_USER} password={DB_PASS} host={DB_HOST} port={DB_PORT}"
)

def query_db(query, params=None, type=None):
    try:
        curr = conn.cursor()
        curr.execute(query)
        conn.commit()
        if "SELECT" in query:
            response = curr.fetchall()
            if not response:
                raise Exception("query did not return any results")
            if not params:
                raise Exception("params for query is empty")
            if not type:
                raise Exception("query type is not defined")
            data = []
            for i in response:
                mapping = dict(zip(params, i))
                data.append(mapping)
            curr.close()
            if type == "collection":
                return data
            if type == "row":
                return data[0]
        else:
            curr.close()

    except Exception as e:
        conn.rollback()
        return {"error" : str(e)}