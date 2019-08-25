import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import IController from './interfaces/IController';
 
class App {
	private port: number;
	private dbUri: string;
	private app: express.Application;
	
	// Create and initialize the Express Application
	constructor(port: number, dbUri: string, controllers: IController[]) {
		this.port = port;
		this.dbUri = dbUri;
		this.app = express();
		
		this.initializeMiddleware();
		this.initializeControllers(controllers);
		this.initializeDatabaseConnection();
	}

	// Add Middleware to the App
	private initializeMiddleware() {
		// Use Router Middlewear instead of addint the routes directly to the "app"
		this.app.use(bodyParser.json());
		// Add header parameters (allow access)
		this.app.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
			//res.setHeader('Access-Control-Allow-Credentials', true);
			next();
		});
	}

	// Add Controller Routes to the App
	private initializeControllers(controllers: IController[]) {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}
	
	// Connect to the MongoDB and start or kill the API based on the result
	private initializeDatabaseConnection() {
		mongoose.connect(this.dbUri, (err: any) => {
			if (err) {
				// Kill the API, in case Database connection failed
				console.log('Error connecting to Database: ' + err.message);
				process.exit(1);
			} else {
				// Start the API if Database connection was established
				console.log('Succesfully connected to Database');
				// Listen for a connection on the specified port
				this.app.listen(this.port, () => {
					console.log('App started');
					console.log('App listening on the port: ' + this.port);
				});
			}
		});
	}

}
 
export default App;
