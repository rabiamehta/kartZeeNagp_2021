# KartZee
An angular v11.2.6 eCommerce Application for sports and fitness equipments. 

## Quick Application Overview 
Application displays list of the sports/fitness equpments. Home page reflects the bestselling products and categories & sub-category menu can then drift to the respective available products.  
End user will be able to search any product based on the `tags` assigned to each product, view details/description of product, add product to cart and checkout.  
Only authorised user can add product to cart and buy products.  

## Development server
`Json-Server` is used to mock apis for JSON data as backend.  
Install json-server `npm i -g json-server` and run `json-server .\mocks\data\mock-data.json` from root directory of project.
Json-server mocked apis can be then accessed at  `http://localhost:3000`.  

To run application locally,  
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  

To access already deployed application,  
Make sure to install & run json-server mocking the backend apis and then simply hit - netlify deployed URL - ` `.   

## Authentication 
Since only mocked user can log in to the application, either change the email/password for user in mock JSON or use following-  
`email`: `nagp@gmail.com`,  
`password`: `123456`
