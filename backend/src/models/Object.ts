// Object MODEL CLASS
import * as mongoose from 'mongoose';
import IObject from '../interfaces/IObject';

// Schema definition of how the document (ROW) looks like
const objectSchema: mongoose.Schema = new mongoose.Schema({
    objectID: { type: Number, required: true, unique: true },
    objectName: { type: String, required: true },
    startsQuestIDs: { type: [Number], required: true},
    endsQuestIDs: { type: [Number], required: true},
    spawns: { type: [mongoose.Schema.Types.Mixed], required: true }
});

// Create a collection (TABLE) of Object-Documents based on the Schema
const ObjectModel = mongoose.model<IObject>('objects', objectSchema);
export default ObjectModel;
