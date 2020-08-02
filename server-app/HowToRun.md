Run the server
To set up and launch the server application:

1. Go to the starter-kit/server-app directory of the cloned repo.
2. Copy the .env.example file in the alpha/server-app directory, and create a new file named .env.
3. Edit the newly created .env file and update the CLOUDANT_ID and CLOUDANT_IAM_APIKEY with the values from the service credential you created in Step 2. (Note that the username from the credential is what should be used for the CLOUDANT_ID.)
4. Edit the name value in the manifest.yml file to your application name (for example, my-app-name).
5. From a terminal:
	a. Go to the alpha/server-app directory of the cloned repo.
	b. Install the dependencies: npm install.
	c. Launch the server application locally or deploy to IBM Cloud:
		To run locally:
		1. Start the application: npm start.
		2. The server can be accessed at http://localhost:3000.
		To deploy to IBM Cloud:
		1. Log in to your IBM Cloud account using the IBM Cloud CLI: ibmcloud login.
		2. Target a Cloud Foundry org and space: ibmcloud target --cf.
		3. Push the app to IBM Cloud: ibmcloud app push.
		4. The server can be accessed at a URL using the name given in the manifest.yml file (for example, https://my-app-name.bluemix.net).
