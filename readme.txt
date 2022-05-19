CONTENTS OF THIS FILE
---------------------

 * Content of Deliverables
 * Configuration
 * Important data

CONTENT OF DELIVERABLES
------------
 * client
 * services
 * WSO2Integration
 * Members.txt
 * README.md
 * readme.txt

CONFIGURATION
-------------
 

 * Setup backend services:

   - Install npm packages using following command

     npm install

	by opening command prompt on following directories
		* services/movie-service
		* services/user-service
		* services/ticket-service
		* services/theater-service

   - Run the back end services using following command

     npm run dev

	by opening command prompt on following directories
		* services/movie-service
		* services/user-service
		* services/ticket-service
		* services/theater-service
     Now you have successfully run the services


 * Setup WSO2 Integration:

   - You will need WSO2 Integration studio
	download -  https://wso2.com/enterprise-integrator/6.6.0#
   - Once you have Installed the app open WSO2Integration as the workspace
   - Right click on the MovieReservationPlatform/MovieReservationPlatformConfig file in the project explore
   - Click on Run As ,then select Run On Micro Integrator
   You have now successfully integrated the project


 * Setup client front end:

   - Install npm packages using following command

     npm install 

	by opening command prompt on following directories
		* client
  - Run the back end services using following command

     npm start

	by opening command prompt on following directories
		* client

 
IMPORTANT DATA 
---------------

.env

REFRESH_TOKEN_SECRET=njajkldaskdjaskdkajsdkl
ACCESS_TOKEN_SECRET=jajdaskldaskldjksajdklasjd
CLOUD_NAME=sliitamila
CLOUD_API_KEY=397144919232425
CLOUD_API_SECRET=36aIGmnN_0eNNYx81EWHdVeAiuo