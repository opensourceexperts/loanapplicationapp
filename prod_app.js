import math
import random
import requests
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])

QUICKBOOKS_API = 'https://quickbooks.api.com'
XERO_API = 'https://xero.api.com'
MYOB_API = 'https://myob.api.com'
USE_LIVE_DATA = os.environ.get('USE_LIVE_DATA', 'False').lower() == 'true'

@app.route('/api/balance-sheet', methods=['POST', 'GET'])
def get_balance_sheet():
    provider = request.form.get('accountingProvider')
    if USE_LIVE_DATA:
        if provider == 'QUICKBOOKS':
            api_response = requests.get(QUICKBOOKS_API + '/balance-sheet')
        elif provider == 'XERO':
            api_response = requests.get(XERO_API + '/balance-sheet')
        elif provider == 'MYOB':
            api_response = requests.get(MYOB_API + '/balance-sheet')
        else:
            # return an error response if the provider is not recognized
            response = jsonify({'error': 'Provider not recognized'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods', 'POST')
            response.headers.add('Access-Control-Allow-Headers', '*')
            response.headers.add('Cache-Control', 'no-cache, no-store, must-revalidate')
            response.headers.add('Pragma', 'no-cache')
            response.headers.add('Expires', '0')
            return response

        sheet = api_response.json()
    else:
        # Dummy data for balance sheet
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
    app.run
