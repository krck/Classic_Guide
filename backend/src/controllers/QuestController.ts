import * as express from 'express';
import IController from '../interfaces/IController';
import QuestModel from '../models/Quest';
import NpcModel from '../models/Npc';
import ObjectModel from '../models/Object';

class QuestController implements IController {
	public router = express.Router();
	public route = '/quest';
	private quests = QuestModel;
	private npcs = NpcModel;
    private objects = ObjectModel;

	constructor() {
		// Init the Controller routes
		this.router.get(this.route, this.getAllQuests)
		this.router.get(this.route + 'Target/:id', this.getQuestById)
	}
	
	// HTTP GET: Return all Quests
	private getAllQuests = (request: express.Request, response: express.Response) => {
		this.quests.find().then(posts => {
			if (posts) response.send(posts)
			else response.status(500).send({ error: 'Error on loading QUEST data' })
		})
	}
	
	// HTTP GET {id}, stepType, zoneId: Return the Quest-Target data for one Quest
	private getQuestById = (request: express.Request, response: express.Response) => {
		// Cast string parameters to Number via "+"
		const questId : Number = +request.params.id;
		const stepType : Number = +request.query.stepType;
		const zoneId : Number = +request.query.zoneId;

		// Query the DB to get Questdata based on the QuestID
		this.quests.find({ questID: questId }).then(quest => {	
			// Check if exactly one Quest was found
			if(quest !== null && quest.length === 1)
			{
				// Based on the stepType (Start, Gather/Kill, Finish) get 
				// the required NPCs or Objects for the specific Quest step
				const questTargets = (stepType === 1)
					? quest[0].questStartData
					: (stepType === 2) ? quest[0].questFinishData : quest[0].questObjectiveData;

				// Get all NPC and OBJECT Ids (Equivalent to C# Linq: .Where().Select())
				const npcIDs = questTargets.filter(t => t.type === 'NPC').map(t => t.id);
				const objectIDs = questTargets.filter(t => t.type === 'OBJECT').map(t => t.id);

				// And finally Query the DB to get all NPCs/OBJECTS involved in the current Quest-Step
				Promise.all([
					this.npcs.find({ npcID: { '$in' : npcIDs } }),
					this.objects.find({ objectID: { '$in' : objectIDs } })
				])
				// Await all Query results and combine both into one "QuestTarget" Array as return value
				.then(results => {
					const [npcs, objects] = results
					const res = npcs.filter(n => n.zoneID === zoneId).map(n => ({ name : n.npcName, type : "NPC", locations: n.coords }))
								.concat(objects.map(o => ({ name : o.objectName, type : "OBJECT", locations: o.spawns.filter(x => x.zoneID === zoneId)[0].coords  })))

					// Return all NPCs and OBJECTs in the requested Zone
					response.send({ quest : quest[0].questName, targets: res });
				})
				.catch(err => response.status(500).send({ error: 'Error on loading NPC/OBJECT data' }))
			}
			else response.status(500).send({ error: 'Error on loading QUEST data' });
		})
	}
}
 
export default QuestController;
