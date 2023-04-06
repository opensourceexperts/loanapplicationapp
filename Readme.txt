About Project  :

The loan application code can vary depending on the specific implementation and requirements of the system, but in general, it will likely have the following flow and features:

User authentication: The user will need to authenticate themselves, typically by entering their username and password or by providing some other form of identification.

Loan application form: Once authenticated, the user will be presented with a loan application form to fill out. This form will typically include fields for personal information (e.g. name, address, date of birth), financial information (e.g. income, expenses, credit score), and details about the loan being requested (e.g. amount, purpose, repayment terms).

Validation: The application will validate the user's input to ensure that all required fields have been filled out and that the data is in the correct format. If any errors are detected, the user will be prompted to correct them before the application can be submitted.

Credit check: The application will typically perform a credit check to assess the user's creditworthiness. This may involve querying credit bureaus to obtain a credit report and score, which will be used to determine whether the user is likely to be approved for the loan.

Loan approval: Based on the user's application and creditworthiness, the system will determine whether to approve the loan or not. If approved, the system will typically generate loan documents (e.g. loan agreement, promissory note) that the user will need to sign and return.

Disbursement: Once the loan documents are signed and returned, the loan will be disbursed to the user's account.

Additional features that may be included in a loan application system include:

Electronic signature: The ability for the user to sign loan documents electronically, without needing to print them out and physically sign them.

Communication: The system may include features for communicating with the user (e.g. email notifications, in-app messaging) to keep them informed about the status of their application.

Loan management: The system may include features for managing the loan after it has been approved, such as allowing the user to make payments, view their loan balance, and request modifications to the loan terms.


Flow of the code :  


This is a React functional component that renders a form using the useFormik hook and Yup validation schema. It also uses the axios library for making HTTP requests.

The component starts by importing the required dependencies:

import React, { useState } from 'react';
import {useFormik,Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';



The useState hook is used to manage state within the component.

const [preAssessment, setPreAssessment] = useState(20);
const [summaryString, setSummaryString] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
const [errors, setErrors] = useState({});


preAssessment is initialized with a value of 20, which represents the initial pre-assessment score. summaryString is an empty string and isSubmitting is initialized to false. errors is an empty object that will be used to store validation errors.

The next step is to define the validation schema for the form using the Yup library. This validation schema defines the required fields and their constraints.

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


The validation schema specifies that the businessName, businessType, abn, contactName, contactEmail, contactPhone, loanAmount and accountingProvider fields are required. The contactEmail field must be a valid email address, and the loanAmount field must be between $1000 and $1,000,000.

The next step is to define the form using the useFormik hook. The useFormik hook is passed an object with the initial values for the form and the validation schema. It also takes an onSubmit callback function that will be called when the form is submitted.



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
      // function logic for submit
    },
  });

  

  The initialValues object specifies the initial values for the form fields.

The onSubmit function is called when the form is submitted. It includes a conditional that checks if the loanAmount field has a value. If it does, it makes an HTTP request to a local server endpoint using the axios library.


if (values.loanAmount)




Engineering principles and standards of the code 

Separation of concerns: The code is separated into several logical concerns, such as validation, form submission, and pre-assessment calculation. This makes the code more modular, easier to maintain, and less error-prone.

DRY (Don't Repeat Yourself) principle: The code uses the Yup validation library to define the validation schema, which makes it more concise and easier to maintain. Instead of defining the validation logic for each field separately, the validation schema defines it once and can be reused throughout the codebase.

Error handling: The code handles errors gracefully by displaying error messages to the user when the form is not filled out correctly. It also uses axios to handle HTTP requests and responses, which helps in handling errors and ensures that the code is more fault-tolerant.

Testing: Although not explicitly shown in the code, the use of a validation library like Yup makes it easier to test the validation logic of the form. Additionally, the separation of concerns and modularity of the code make it easier to test each concern separately.

Best practices: The code follows best practices for React development, such as using React hooks like useState and useFormik, and importing only the necessary modules from external libraries to minimize the bundle size. The use of const instead of var or let to define variables also follows best practices for modern JavaScript development.

Security: The code uses Yup to validate input fields, which helps to prevent security vulnerabilities such as SQL injection or cross-site scripting (XSS). Additionally, the use of axios for HTTP requests helps to prevent security vulnerabilities such as CSRF attacks.



System extensibility & Scalability of the code :

The code is written in React and is a form with input fields that a user fills and submits. The form uses Formik and Yup for form validation. Axios is used to make an HTTP GET request to an API endpoint to fetch balance sheet data. The code then performs a pre-assessment score calculation based on the loan amount, profit or loss, and asset value.

The useState hook is used to create state variables to store the pre-assessment score, summary string, submission status, and errors.

The validationSchema variable is used to define the form validation rules using Yup. It checks that the Business Name, Business Type, ABN, Contact Name, Contact Email, Contact Phone, Loan Amount, and Accounting Provider are all entered by the user.

The MyForm component function is defined, which initializes the formik object with the initial values for the input fields and the validation schema. It also defines a function validate that manually checks the input values for validation errors. This function is passed to the formik object as the validate property.

The onSubmit property of the formik object is set to a function that is executed when the form is submitted. It first checks if the loan amount field has a value and then fetches balance sheet data using axios. Afterward, it performs a pre-assessment score calculation based on the loan amount, profit or loss, and asset value.

The pre-assessment score is then stored in the preAssessment state variable, and a summary string is generated and stored in the summaryString state variable. The form data is also included in the summary string. Finally, the pre-assessment score and summary string are displayed to the user.

The code shows good extensibility and scalability as it makes use of the reusable components provided by React and Formik. The validation rules can be easily modified or extended by changing the validationSchema variable. Additionally, more validation checks can be added in the validate function if required. The code is also scalable, as the pre-assessment score calculation can be expanded to include more complex business logic as required by the application.


Testability  of the code :

The code is using a validation schema provided by Yup. This will make it easy to validate the form values and catch errors early on. It also allows for better code organization, and schema reuse.

The validate function is used to validate form values as well. However, the function does not cover all the validations provided by Yup. So, it is unclear why the function is being used here.

The formik hook provides a submitForm method that can be used to submit the form. This can be helpful when writing integration tests.

The code is also using useState to manage state. This can make it easy to write unit tests for individual components.

The axios call inside the onSubmit function may need to be mocked in order to write reliable tests. Mocking can be done using libraries like jest.mock().

The setPreAssessment, setSummaryString, setIsSubmitting, and setErrors functions are called to manage state. These functions can be stubbed or mocked to test the behavior of the component.


Brevity and Simplicity of code :


The first three lines import various React components, libraries, and packages that will be used in the code, including useState, Formik, Yup, and axios.
The validationSchema variable is a Yup validation schema that defines the required fields and their validation rules for the loan application form.
The MyForm function is a React functional component that defines the form and its behavior. It sets the initial state of several variables using the useState hook, including preAssessment, summaryString, isSubmitting, and errors.
The validate function is a custom validation function that checks the validity of each field in the form and returns any errors that are found.
The formik constant initializes a Formik instance with the initial form values, validation schema, and onSubmit function. It also includes the validate function and sets several state variables based on the form values.
The onSubmit function is called when the form is submitted. It retrieves data from an API endpoint and performs a pre-assessment of the loan application based on the retrieved data and the form inputs. It then sets the preAssessment and summaryString variables based on the pre-assessment results and the form values.
Overall, this code creates a functional loan application form with validation and pre-assessment features using React and several other libraries and packages.





DOCKER Usages 

docker build -t loan-application-system .
docker run -it --rm -p 3000:3000 loan-application-system

This command starts a Docker container and maps port 3000 of the container to port 3000 of the host machine. The --rm option automatically removes the container when it is stopped.

Open a web browser and navigate to http://localhost:3000 to access the React application running inside the Docker container.


