# Weather As A Service
Thinkific take home test 

## Notes
### Date
Wednesday, January 20, 2021
### Location of deployed application
https://thinkific-takehome-weather.herokuapp.com/
### Time spent
6:10  
- Setting up express and Vue projects: 45m  
- Get API to return fake data: 40m
- Create basic frontend: 1h
- Pull real weather data from OWM: 30m
- Setup authentication and user profiles: 1h30m
- Implement API using feathers: 45m
- Dockerize and deploy app to heroku: 1h

### Assumptions made
Unsure as to how much I should rely on an API building framework for this exercise, I implemented the API two ways:

In the `/api` folder is a straight express application which I setup from scratch to avoid using a framework that does too much.  

I also implemented an equivalent API in `/feathers-api` using FeathersJS, which is an API building framework built on top of express which does all of the heavy lifting to contrast it. This is the type of framework I would usually use (sails.js, etc.) rather than using express directly as it provides all of the things I implemented myself in the express app (authentication, model abstraction, error handling). 

### Shortcuts/Compromises made
- In both cases, I omitted connecting the APIs to a database and setup both with in-memory data storage to simplify the deployment and testing of the application. If you restart it you would need to register again.
- Should Mock the API tests to test that requests are being initiated correctly  
- Should use a logging library rather than relying on `console.log`
- The API does not use `helmet` or a similar package to do some basic hardening of the web server  
- In a real service, I would not be baking my own authentication (only did so to demonstrate knowledge of setting up a JSON web token auth strategy)  
- The OpenWeatherMap API will not find a city with an accented character, and will subsequently will break the site, as it will try to load that city but the OWM api won't find it. Could utilise the `cities` resource I created to allow querying of valid cities (or querying via ID rather than `?city=Vancouver`)

#### Potential Frontend Improvements
- test more of the frontend components/views
- test the frontend API calls/vuex actions
- implement nicer error handling
- increase the separation of concerns between elements
- structure the vuex store better (modules, etc)
- the random images returned by Unsplash for each city are not always relevant

### Stretch goals attempted
- ✅ Build a simple UI for the service  
  I built this quickly, and would have liked to structure the Vue app better (Vuex store, separate components better, test better)
- ✅ Add authentication to the service  
  I used the user logging in to enable storage of a user's favourite city to display first when accessing the site
- ✅ Deploy your API  
  Since there is no datastore to connect to, it's deployed to Heroku free using a single Docker container
- ✅ Proxy a real weather API via your service to fetch the actual weather.  
  I am only using a small subset of OpenWeatherMap's data in my API responses.

### Instructions to run assignment locally
#### Using Docker
The easiest way to run this would be to use Docker  
To run the pure express API, from within the project folder run 
```
docker build -t thinkific-weather:latest .
docker run -it -p 3000:3000 thinkific-weather:latest
```
The app should be accessible at `http://localhost:3000`  
To run the FeathersJS API:
```
docker build -f Dockerfile-feathers -t thinkific-weather:latest .
docker run -it -p 3000:3000 thinkific-weather:latest
```

#### Locally
I use node.js v14 LTS as well as yarn, but this should work with npm as well.  

In the `/api` folder (also works for `/feathers-api`)
```
yarn install  # to install dependencies
yarn dev      # to start the api on port 3000
```

To start the frontend, in the `/web` folder
```
yarn install
yarn serve
```
By default the API will start on port 3000 (can set PORT environment variable to change that), and the frontend will start on port 8080. To access the site, you can use 
http://localhost:8080

### What did you not include in your solution that you want us to know about?
I would have liked to include a database to persist user data to, as well as cache weather data to not proxy requests to OpenWeatherMap every API call. However, using the models I setup, it should be almost a drop-in solution to add a database and ORM with minimal effort.  


### Other information about your submission that you feel it's important that we know if applicable.
I chose to use express for the API and Vue for the frontend as I have worked with express extensively, and have the most recent experience with Vue. It was also easy to use TypeScript for both, and I did not have to switch between languages when working on the API/frontend.

### Your feedback on this technical challenge
I enjoyed this technical challenge and I think the amount of direction/the open-ended creation of an API is interesting and reflective of how you might create a brand new API/project. 
