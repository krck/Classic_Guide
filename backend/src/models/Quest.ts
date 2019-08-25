// Quest MODEL CLASS
import * as mongoose from 'mongoose';
import IQuest from '../interfaces/IQuest';

// Schema definition of how the document (ROW) looks like
const questSchema: mongoose.Schema = new mongoose.Schema({
  questID: { type: Number, required: true, unique: true },
  questGroupPosition: { type: Number, required: true },
  questName: { type: String, required: true },
  questText: { type: String, required: true},
  questStartData: { type: [mongoose.Schema.Types.Mixed], required: true },
  questObjectiveData: { type: [mongoose.Schema.Types.Mixed], required: true },
  questFinishData: { type: [mongoose.Schema.Types.Mixed], required: true },
});

// Create a collection (TABLE) of Quest-Documents based on the Schema
const QuestModel = mongoose.model<IQuest>('quests', questSchema);
export default QuestModel;
