Techncial documentation (Flask backend JSON code): 

how to use the Flask backend JSON code:

Setting Environment Variables
Before running the Flask backend, you need to set an environment variable to determine whether to use live data from the Account provider API or to use mock data.
To set the environment variable, follow the steps below:

Open Windows PowerShell or SSH Terminal.
For Windows, use the command set USE_LIVE_DATA=False to set the environment variable to either True or False.
For Linux/Mac, use the command export USE_LIVE_DATA=False to set the environment variable to either True or False.
Alternatively, you can add the environment variable in your IDE or in the project configuration files.
Show Balance Sheet Values as JSON
To show the balance sheet values as JSON, you need to use the show sheet = [] value in the Flask form submission path. This will return the balance sheet values as a JSON object.

Fetching Data from Account Provider API
If you configure the USE_LIVE_DATA environment variable to True, the Flask backend will fetch data from the Account provider API. The API path for each provider is as follows:

Quickbooks: https://quickbooks.api.com
Xero: https://xero.api.com
Freshbooks: https://freshbooks.api.com
Make sure to set the USE_LIVE_DATA environment variable to True before running the Flask backend if you want to fetch data from the Account provider API.

Troubleshooting PYTHONPATH Errors
If you encounter any errors related to the PYTHONPATH, you can set the environment variable using the following commands:
$env:PYTHONPATH = "C:\code\loan_application_system\backend\app"
echo $env:PYTHONPATH
Docker Setup
To set up the Flask backend using Docker, follow the steps below:
Build the Docker image using the command docker build -t my-flask-app .
Run the Docker container using the command docker run -p 5000:5000 my-flask-app
Check the Flask application at http://localhost:5000
Dev Environment Setup in PowerShell
If you're using PowerShell, follow these steps to set up your development environment:
Open PowerShell as an Administrator.
Use the command dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart to install the required package management tools.
Use the command dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart to install the required virtual machine platform.
Restart your computer to apply the changes.
Download and install the latest version of Docker Desktop for Windows from the official website.
Follow the installation wizard to complete the installation process.
Once installed, launch Docker Desktop from the Windows Start menu.
Test Docker by running the command docker run hello-world in PowerShell.
I hope this helps you understand how to use the Flask backend JSON code and set up your development environment. If you have any further questions or need more information, feel free to ask!


Docker Backend 

docker build -t my-flask-app .
docker run -p 5000:5000 my-flask-app
http://localhost:4000