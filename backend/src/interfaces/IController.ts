import { Router } from 'express';

// Every Controller needs a Route and a Router
interface IController {
	// Use the router object to call methods like get, put, patch and delete just like on the app object
	router: Router;
	route: string;
}

export default IController;
