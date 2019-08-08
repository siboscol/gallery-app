# Gallery App Project

Prototype photo gallery build with NodeJS + NextJS + React + MongoDB API for User Management, Authentication and Registration.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install gallery-app.

```
# Clone the repository
git clone https://github.com/siboscol/gallery-app.git
# Install app's dependencies
npm install
```

### Install mongodb locally

To install mongodb on Mac follow => https://treehouse.github.io/installation-guides/mac/mongo-mac.html

- To install mongodb on Window follow => https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514
  - Run the Mongo daemon, in one of your terminal windows run `mongod`. This should start the Mongo server.
  - Run the Mongo shell, with the Mongo daemon running in one terminal, type `mongo` in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.

### Secrets for Environment Variables

On `.env.example` there are the environment variables that needs to be set for the project.

Copy/Rename the file to `.env` on the root folder and set the mongodb uri and secret for JWT.

## Usage

```
# To run the app in production mode
npm start
```

Navigate to http://localhost:80.

```
# Or to run the app in development mode
npm run dev
```
Navigate to http://localhost:4000. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the next project. The build artifacts will be stored in the `.next/` directory.

----

## Further reading

### Database hosting

If you need an instance of MongoDB in the cloud https://mlab.com/ have free and inexpensive options.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
