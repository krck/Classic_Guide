import * as mongoose from 'mongoose';

// Zone Interface
interface IZone extends mongoose.Document {
    segmentID: number;
    segmentTitle: string;
    segmentFrom: number;
    segmentTo: number;
    zoneID: number;
    zoneName: string;
    steps: any[];
}

export default IZone;
