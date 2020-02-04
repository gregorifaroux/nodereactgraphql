# Employee Management App

## Application that allows users to:

- Create employee records that include **first name**, **last name**, **email address**, and **department**.
- Read, update, and delete record(s).

## Demo

[Live Demo](https://nodereactgraphql.herokuapp.com/)

- **Plus icon** on the top right to add an employee
- **Edit/pencil icon** to update a record
- **Delete/trash icon** to remove a record
- The datatable has **search** and **sort** functionalities.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/gregorifaroux/nodereactgraphql.git # or clone your own fork
$ cd nodereactgraphql
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Tech/framework used

### Apollo Server Express & Mongoose

#### General information

#### GraphQL Version

- Rate limit
- Depth Limiting [graphql-depth-limit](https://github.com/stems/graphql-depth-limit)
- Amount Limiting - Restrict maximum record of findMany

#### Code

- `index.js`: Server set up
- `schemas/`: Queries and Mutations
- `models/`: Employee Information model ( Mongoose models )

### React Front-end

- Created via `create-react-app`
- Airbnb lint & pre-commit hooks to run lint and prettier
- User @apollo/react-hooks and apollo-boost
- Use Hooks for state management and API calls
- Form via [react-hook-form](https://react-hook-form.com/)
- Data table via [react-bootstrap-table-next](https://github.com/react-bootstrap-table/react-bootstrap-table2#readme)
- UI Bootstrap components via [reactstrap](https://reactstrap.github.io/)

#### Code

- `EmployeeList`: Main datatable with add, edit, and delete actions.
- `AddEmployee`: API calls to create a new employee and use `EmployeeForm` to collect and validate the data.
- `EditEmployee`: API calls to edit and use `EmployeeForm` to collect and validate the data.
- `EmployeeForm`: React Hook form used to create or to edit employee records.
- `DeleteEmployee`: Confirmation page instead of using the traditional modal.

## Step by step guide to get started

### 1. Setup MongoDB provider

#### Install Mongo locally

The first approach is to install Mongo locally. In order to so, go to [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions based on your operating system.

#### Get a Sandbox Mongo instance on mLab or via Heroku

The second option is to create a FREE database hosted on mLab and then connect your application to the remote instance. To do so, go to [mLab](http://mlab.com/) and create a sandbox Mongo instance. Then, go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; setup username and password. Remember those values, we'll need them shortly!

### 2. Create your .env files:

Inside both 'server' and 'client' folders there is a .env.sample file. Create a new file called `.env` based on the provided `.env.sample`.
