// Npc MODEL CLASS
import * as mongoose from 'mongoose';
import INpc from '../interfaces/INpc';

// Schema definition of how the document (ROW) looks like
const npcSchema: mongoose.Schema = new mongoose.Schema({
    npcID: { type: Number, required: true, unique: true },
    npcName: { type: String, required: true },
    zoneID: { type: Number, required: true},
    coords: { type: [mongoose.Schema.Types.Mixed], required: true }
});

// Create a collection (TABLE) of NPC-Documents based on the Schema
const NpcModel = mongoose.model<INpc>('npcs', npcSchema);
export default NpcModel;
