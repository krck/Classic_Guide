import App from './app';
import ZoneController from './controllers/ZoneController';
import QuestController from './controllers/QuestController';

const port: number = 3000;
const dbUri: string = 'mongodb://mongodb/classicDB';
//const dbUri: string = 'mongodb://localhost:27017/classicDB'; // DEBUG-SETTING

// Create the Express with a Port and all Controllers
const app = new App(port, dbUri, [ 
	new ZoneController(), 
	new QuestController()
]);
