import * as mongoose from 'mongoose';

// Object Interface
interface IObject extends mongoose.Document {
    objectID: number;
	objectName: string;
    startsQuestIDs: number[];
    endsQuestIDs: number[];
    spawns: [{ zoneID: number, coords: [{ x: number, y: number }]}];
}

export default IObject;
