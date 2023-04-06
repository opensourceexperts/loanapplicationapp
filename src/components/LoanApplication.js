import React, { useState } from 'react';
import {useFormik,Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  businessName: Yup.string().required('Business Name is required'),
  businessType: Yup.string().required('Business Type is required'),
  abn: Yup.string().required('ABN is required'),
  contactName: Yup.string().required('Contact Name is required'),
  contactEmail: Yup.string()
    .email('Invalid email format')
    .required('Contact Email is required'),
  contactPhone: Yup.string().required('Contact Phone is required'),
  loanAmount: Yup.number()
    .min(11, 'Minimum loan amount is $1000')
    .max(10000000000000, 'Maximum loan amount is $1,000,000')
    .required('Loan Amount is required'),
  accountingProvider: Yup.string().required('Accounting Provider is required'),
});
  
const MyForm = () => {
  const [preAssessment, setPreAssessment] = useState(20);
  const [summaryString, setSummaryString] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
const [errors, setErrors] = useState({});


  const validate = (values) => {
    const errors = {};
  
    if (!values.businessName) {
      errors.businessName = 'Required';
    }
  
    if (!values.businessType) {
      errors.businessType = 'Required';
    }
  
    if (!values.abn) {
      errors.abn = 'Required';
    } else if (isNaN(Number(values.abn))) {
      errors.abn = 'Must be a number';
    } else if (values.abn.length !== 11) {
      errors.abn = 'Must be exactly 11 digits';
    }
  
    // add more validations as needed
  
    return errors;
  };

  

  const formik = useFormik({
    initialValues: {
      businessName: 'My Business',
      businessType: 'Proprietaryship',
      abn: '12345678901',
      contactName: 'Manisekaran Chandramohan',
      contactEmail: 'we.process.security@gmail.com',
      contactPhone: '32282755509',
      loanAmount: '111111',
      accountingProvider: 'QUICKBOOKS',
    },
    validationSchema,
    onSubmit: values => {
      if (values.loanAmount) {
        const fetchBalanceSheet = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/balance-sheet');
            const sheet = response.data;
            const profitOrLoss = sheet.reduce((total, item) => total + item.profitOrLoss, 0);
            const assetsValue = sheet.reduce((total, item) => total + item.assetsValue, 0) / 12;
  
            let preAssessment;

            preAssessment = 20;


            if (values.loanAmount > assetsValue) {
              // If the loan amount is greater than the asset value, set preAssessment to 20
              preAssessment = 20;
              // Also set the reason for the low pre-assessment score
              setReason("Your loan amount is greater than your asset value, which is why you scored a 20. Consider reducing your loan amount or increasing your assets.");
            }
            
            if (profitOrLoss > 0) {
              // If the profitOrLoss is greater than zero, set preAssessment to 60
              preAssessment = 60;
            }
            
            if (profitOrLoss < 0) {
              // If the profitOrLoss is less than zero, set preAssessment to 20
              preAssessment = 20;
            } 
            
            if ((assetsValue > values.loanAmount) && (profitOrLoss > 0) ) {
              // If the asset value is greater than the loan amount and profitOrLoss is greater than zero, set preAssessment to 100
              preAssessment = 100;
            }
            
            if ((assetsValue > values.loanAmount) && (profitOrLoss < 0) ) {
              // If the asset value is greater than the loan amount and profitOrLoss is less than zero, set preAssessment to 60
              preAssessment = 60;
            }
            
            if ((values.loanAmount > assetsValue) && (profitOrLoss < 0) ) {
              // If the loan amount is greater than the asset value and profitOrLoss is less than zero, set preAssessment to 20
              preAssessment = 20;
            }
            
            
            setPreAssessment(preAssessment);
            setSummaryString(
              `Summary of Profit or Loss: <strong>${profitOrLoss}</strong><br>
               Assets Value: <strong>${assetsValue}</strong><br>
               Pre-Assessment: <strong>${preAssessment} Score</strong> <br><br>
               Your Form Details:<br>
               Business Name: <strong>${formik.values.businessName}</strong><br>
               Business Type: <strong>${formik.values.businessType}</strong><br>
               ABN: <strong>${formik.values.abn}</strong><br>
               Contact Name: <strong>${formik.values.contactName}</strong><br>
               Contact Email: <strong>${formik.values.contactEmail}</strong><br>
               Contact Phone: <strong>${formik.values.contactPhone}</strong><br>
               Loan Amount: <strong>${formik.values.loanAmount}</strong><br>
               Accounting Provider: <strong>${formik.values.accountingProvider}</strong><br>
              `
            );
            
                      } catch (error) {
            console.log(error);
          }
        };
  
        fetchBalanceSheet();
      }
    },
  });
  


  const handleApplyForLoan  = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/loan-application',  {
        summary: summaryString,
      });
      console.log(response.data);
      // show success message or redirect to success page
    } catch (error) {
      console.log(error);
      // show error message or redirect to error page
    }
    setIsSubmitting(false);
  };
  
  return (
   <form onSubmit={formik.handleSubmit}>
    <div> {<p dangerouslySetInnerHTML={{ __html: summaryString }} />} </div>

    <div className="form-group">

      <label htmlFor="businessName">Business Name</label>
      <input
        id="businessName"
        name="businessName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.businessName}
      />
      {formik.errors.businessName ? (
        <div>{formik.errors.businessName}</div>
      ) : null}

     </div>

     <div className="form-group">

      <label htmlFor="businessType">Business Type</label>
      <input
        id="businessType"
        name="businessType"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.businessType}
      />

       {formik.errors.businessType ? (
        <div>{formik.errors.businessType}</div>
       ) : null}
     </div>

<div className="form-group">

      <label htmlFor="abn">ABN</label>
      <input
        id="abn"
        name="abn"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.abn}
      />

      {formik.errors.abn ? (
        <div>{formik.errors.abn}</div>
       ) : null}

</div>

<div className="form-group">
      <label htmlFor="contactName">Contact Name</label>
      <input
        id="contactName"
        name="contactName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.contactName}
      />

{formik.errors.contactName ? (
        <div>{formik.errors.contactName}</div>
       ) : null}

</div>

<div className="form-group">
      <label htmlFor="contactEmail">Contact Email</label>
      <input
        id="contactEmail"
        name="contactEmail"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.contactEmail}
      />
      {formik.errors.contactEmail ? (
        <div>{formik.errors.contactEmail}</div>
       ) : null}

</div>

<div className="form-group">
      <label htmlFor="contactPhone">Contact Phone</label>
      <input
        id="contactPhone"
        name="contactPhone"
        type="tel"
        onChange={formik.handleChange}
        value={formik.values.contactPhone}
      />
      {formik.errors.contactPhone ? (
        <div>{formik.errors.contactPhone}</div>
       ) : null}

</div>

<div className="form-group">
      <label htmlFor="loanAmount">Loan Amount</label>
      <input
        id="loanAmount"
        name="loanAmount"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.loanAmount}
      />

{formik.errors.loanAmount ? (
        <div>{formik.errors.loanAmount}</div>
       ) : null}
     </div>

<div className="form-group">
      <label htmlFor="accountingProvider">Accounting Provider</label>
      <select
        id="accountingProvider"
        name="accountingProvider"
        onChange={formik.handleChange}
        value={formik.values.accountingProvider}
      >
        <option value="">Select Accounting Provider</option>
        <option value="QUICKBOOKS">Quickbooks</option>
        <option value="XERO">Xero</option>
        <option value="MYOB">MYOB</option>
      </select>

      {formik.errors.accountingProvider ? (
        <div>{formik.errors.accountingProvider}</div>
       ) : null}
      </div>

  
        
     <button type="submit">Get BalanceSheet </button>
     {preAssessment === 60 || preAssessment === 100 ? (
  <button onClick={handleApplyForLoan} type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Apply for Loan'}
  </button>
) : null}

    </form>
    
  );
};

export default MyForm;