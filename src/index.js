import React from 'react';
import ReactDOM from 'react-dom';
import { API_URL } from './config';
import LoanApplication from './components/LoanApplication';


const fetch_balance_sheet = async (provider, abn) => {
  // make API request to fetch balance sheet data
  const response = await fetch(`${API_URL}/balance-sheet?provider=${provider}&abn=${abn}`);
  const data = await response.json();
  return data;
}

ReactDOM.render(
  <LoanApplication fetch_balance_sheet={fetch_balance_sheet} />,
  document.getElementById('root')
);
