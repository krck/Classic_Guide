import * as express from 'express';
import IController from '../interfaces/IController';
import ZoneModel from '../models/Zone';
 
class ZoneController implements IController {
	public router = express.Router();
	public route = '/zone';
	private zones = ZoneModel;

	constructor() {
		// Init the Controller routes
		this.router.get(this.route, this.getAllZones)
	}

	// HTTP GET: Return all Zones with the Steps
	private getAllZones = (request: express.Request, response: express.Response) => {
		this.zones.find().sort({ segmentID: 1 }).then(result => {
			if (result) response.send(result)
			else response.status(500).send({ error: 'Error on loading ZONE data' })
		})
	}
}
 
export default ZoneController;
