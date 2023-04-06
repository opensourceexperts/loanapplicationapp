import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



function SimpleComponent() {
  const [clicked, setClicked] = useState(false);
  const [preAssessment, setPreAssessment] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summaryString, setSummaryString] = useState('');
  
  
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/balance-sheet').then((response) => {
      const sheet = response.data;
      const profitOrLoss = sheet.reduce((total, item) => total + item.profitOrLoss, 0);
      const assetsValue = sheet.reduce((total, item) => total + item.assetsValue, 0) / 12;

      if (profitOrLoss > 0) {
        setPreAssessment(60);
      } else if (assetsValue > formik.values.loanAmount) {
        setPreAssessment(100);
      } else {
        setPreAssessment(20);
      }

      setSummaryString(`Summary of Profit or Loss: <strong>${profitOrLoss}</strong><br>Assets Value: <strong>${assetsValue}</strong><br>Pre-Assessment: <strong>${preAssessment}</strong>`);
    }).catch((error) => {
      console.log(error);
    });
  }, []);


  
  

  // Use useFormik hook to handle form state and submission
  const formik = useFormik({
    initialValues: {
      businessName: 'My Business',
      businessType: 'Proprietaryship',
      abn: '12345678901',
      contactName: 'George',
      contactEmail: 'we.process.security@gmail.com',
      contactPhone: '32282755509',
      loanAmount: '102003939',
      accountingProvider: 'QUICKBOOKS',
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required('Required'),
      businessType: Yup.string().required('Required'),
      abn: Yup.string()
        .matches(/^\d{11}$/, 'Must be 11 digits')
        .required('Required'),
      contactName: Yup.string().required('Required'),
      contactEmail: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      contactPhone: Yup.string()
        .matches(/^\d{11}$/, 'Must be 11 digits')
        .required('Required'),
      loanAmount: Yup.number()
        .min(0, 'Must be greater than or equal to 0')
        .required('Required'),
      accountingProvider: Yup.string().required('Required'),
    }),

onSubmit: (values) => {
  axios.post('http://localhost:5000/api/balance-sheet', values)
    .then((response) => {
      const sheet = response.data;
      const profitOrLoss = sheet.reduce((total, item) => total + item.profitOrLoss, 0);
      const assetsValue = sheet.reduce((total, item) => total + item.assetsValue, 0) / 12;

      let preAssessment;
      if (profitOrLoss > 0) {
        preAssessment = 60;
      } else if (assetsValue > values.loanAmount) {
        preAssessment = 100;
      } else {
        preAssessment = 20;
      }

      setPreAssessment(preAssessment);
      setIsSubmitted(true);

      const summaryString = `Summary of Profit or Loss: <strong>${profitOrLoss}</strong><br>Assets Value: <strong>${assetsValue}</strong><br>Pre-Assessment: <strong>${preAssessment}</strong>`;
      const summaryDiv = document.getElementById('summary');
      summaryDiv.innerHTML = summaryString;

      console.log(`Summary of Profit or Loss: ${profitOrLoss}`);
      console.log(`Assets Value: ${assetsValue}`);
      console.log(`Pre-Assessment: ${preAssessment}`);

      axios.post('http://localhost:5000/api/loan-application', {
        businessName: values.businessName,
        yearEstablished: new Date().getFullYear(),
        summaryOfProfitOrLoss: profitOrLoss,
        preAssessment: preAssessment,
      });
    })
    .catch((error) => {
      console.log(error);
    });
},


const LoanApplication = () => {
  // ...other code...
  
  const handleClick = () => {
    setClicked(true);
  };
  
    if (preAssessment === null) {
    // Add a loading spinner or some other indicator that the component is still loading
    return <div>Loading...</div>;
  }
  
  // ...other code...
}



  return (
	 <form onSubmit={formik.handleSubmit}>
	       <h1>Loan Application Form</h1>

	   <label htmlFor="businessName">Business Name</label>
  {/* Use formik.getFieldProps instead of manually attaching onChange, onBlur, and value */}
  <input
    type="text"
    id="businessName"
    name="businessName"
    {...formik.getFieldProps('businessName')}
  />
  {formik.touched.businessName && formik.errors.businessName ? (
    <div>{formik.errors.businessName}</div>
  ) : null}
  <br />

  <label htmlFor="businessType">Business Type</label>
  <select
    id="businessType"
    name="businessType"
    {...formik.getFieldProps('businessType')}
  >
    <option value="Proprietaryship">Proprietaryship</option>
    <option value="Partnership">Partnership</option>
    <option value="Company">Company</option>
  </select>
  {formik.touched.businessType && formik.errors.businessType ? (
    <div>{formik.errors.businessType}</div>
  ) : null}
  <br />
  <label htmlFor="abn">Australian Business Number (ABN)</label>
  <input
    type="text"
    id="abn"
    name="abn"
    {...formik.getFieldProps('abn')}
  />
  {formik.touched.abn && formik.errors.abn ? (
    <div>{formik.errors.abn}</div>
  ) : null}
  <br />
  <label htmlFor="contactName">Contact Name</label>
  <input
    type="text"
    id="contactName"
    name="contactName"
    {...formik.getFieldProps('contactName')}
  />
  {formik.touched.contactName && formik.errors.contactName ? (
    <div>{formik.errors.contactName}</div>
  ) : null}
  <br />
  <label htmlFor="contactEmail">Contact Email</label>
  <input
    type="email"
    id="contactEmail"
    name="contactEmail"
    {...formik.getFieldProps('contactEmail')}
  />
  {formik.touched.contactEmail && formik.errors.contactEmail ? (
    <div>{formik.errors.contactEmail}</div>
  ) : null}
  <br />
  <label htmlFor="contactPhone">Contact Phone</label>
  <input
    type="tel"
    id="contactPhone"
    name="contactPhone"
    {...formik.getFieldProps('contactPhone')}
  />
  {formik.touched.contactPhone && formik.errors.contactPhone ? (
    <div>{formik.errors.contactPhone}</div>
  ) : null}
  <br />
  <label htmlFor="loanAmount">Loan Amount</label>
  <input
    type="number"
    id="loanAmount"
    name="loanAmount"
    {...formik.getFieldProps('loanAmount')}
  />
  {formik.touched.loanAmount && formik.errors.loanAmount ? (
    <div>{formik.errors.loanAmount}</div>
  ) : null}
  <br />
  <label htmlFor="accountingProvider">Accounting Provider</label>
  <select
    id="accountingProvider"
    name="accountingProvider"
    {...formik.getFieldProps('accountingProvider')}
  >
    <option value="QUICKBOOKS">QuickBooks</option>
    <option value="XERO">Xero</option>
    <option value="MYOB">MYOB</option>
  </select>
  {formik.touched.accountingProvider && formik.errors.accountingProvider ? (
    <div>{formik.errors.accountingProvider}</div>
  ) : null}
  <br />
  <button type="submit">Submit</button>
  
    <div id="summary"></div>

</form>
);




}




export default SimpleComponent;
