// Zone MODEL CLASS
import * as mongoose from 'mongoose';
import IZone from '../interfaces/IZone';

// Schema definition of how the document (ROW) looks like
const zoneSchema: mongoose.Schema = new mongoose.Schema({
  segmentID: { type: Number, required: true, unique: true },
  segmentTitle: { type: String, required: true, unique: true },
  segmentFrom: { type: Number, required: true },
  segmentTo: { type: Number, required: true },
  zoneID: { type: Number, required: true },
  zoneName: { type: String, required: true },
  steps: { type: [mongoose.Schema.Types.Mixed], required: true }
});

// Create a collection (TABLE) of Zone-Documents based on the Schema
const ZoneModel = mongoose.model<IZone>('zones', zoneSchema);
export default ZoneModel;
