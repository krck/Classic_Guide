import * as mongoose from 'mongoose';

// NPC Interface
interface INpc extends mongoose.Document {
    npcID: number;
	npcName: string;
    zoneID: number;
    coords: [{ x: number, y: number }];
}

export default INpc;
