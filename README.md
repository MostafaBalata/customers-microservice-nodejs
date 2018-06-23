# Customers management microservice
An example how to build microservice using Express js, Mongodb and ES6. Its customer managing Microserivce which provides 
a simple RESTful API to get, add, edit and delete customers.

# How to run
its docker container that's run the image of the microservice working together with anther container that is running mongodb image,
```
docker-compose up
```
its working on http://localhost:3000
By running `docker-compoose` we have advatage of running multiple containers and to be sure that our service will start after database
is ready.  

# How to run tests
Note: service doesnt have to be running.
- Unit tests

```
yarn unit-test
```

- Integration tests
Note: make sure that the service is running using this command `yarn serve-testing` then you need to run the tests as following:
```
yarn integration-tests
```

# Endpoint:
- GET /customers:
returning all the customers

- POST /customers/:id :
Updateing existing customer by sending json object in the `body` for the data you want to change.

- PUT /customers :
Add new customer by sending json object in the `body` for the data you want to change.

- DELETE /customers/:id
Delete certin customer


Thanks
