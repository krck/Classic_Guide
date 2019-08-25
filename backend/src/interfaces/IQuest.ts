import * as mongoose from 'mongoose';

// Quest Interface
interface IQuest extends mongoose.Document {
	questID: number,
	questGroupPosition: number, // Count of all quests with the same name
	questName: string,
	questText: string,
	questStartData: [{ id: number, type: string }], 	// Type is "NPC" or "OBJECT"
	questObjectiveData: [{ id: number, type: string }], // -"-
	questFinishData: [{ id: number, type: string }], 	// -"-
}

export default IQuest;
