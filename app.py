import math
import random
from flask import Flask
from flask_cors import CORS
from flask import Flask, jsonify

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])

@app.route('/api/balance-sheet', methods=['POST', 'GET'])
def get_balance_sheet():
    # Dummy data for balance sheet
    
    #create loss statement   "profitOrLoss": -2200000000 ,
    sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": -200000000 ,
            "assetsValue": random.randint(-1000, 1000)
        },
        {
            "year": 2020,
            "month": 11,
            "profitOrLoss": random.randint(-100000, 10000000),
            "assetsValue": random.randint(-1000, 1000000)
        },
        {
            "year": 2020,
            "month": 10,
            "profitOrLoss": random.randint(-100000, 10000000),
            "assetsValue": random.randint(1000, 1000000)
        },
        {
            "year": 2020,
            "month": 9,
            "profitOrLoss": random.randint(-100000, 10000000),
            "assetsValue": random.randint(1000, 1000000)
        }
    ]
    response = jsonify(sheet)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.add('Pragma', 'no-cache')
    response.headers.add('Expires', '0')

    return response

@app.route('/api/loan-application', methods=['POST'])
def post_loan_application():
    # Add loan application logic here
    response = jsonify({"message": "Loan application received"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response

if __name__ == '__main__':
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.run(debug=True)
