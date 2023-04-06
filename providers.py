import random

def fetch_balance_sheet_data(abn):
    # Generate random profit/loss and assets value
    profit_or_loss = random.randint(250001, 500000)
    assets_value = random.randint(1235, 1000000)
    
    # Generate dummy data for balance sheet
    sheet = [
        {
            "year": 2020,
            "month": 12,
            "profitOrLoss": profit_or_loss,
            "assetsValue": assets_value
        },
        {
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
        },
        {
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
        },
        {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
        }
    ]
    
    assets = sheet[0]["assetsValue"]
    liabilities = assets / 2
    equity = assets / 2

    return {
        "assets": assets,
        "liabilities": liabilities,
        "equity": equity,
        "sheet": sheet
    }
