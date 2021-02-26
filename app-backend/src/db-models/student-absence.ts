import * as mongoose from 'mongoose';

const studentAbsenceSchema = new mongoose.Schema({
    from_date: {
        type: Date, 
        required: false,
    },
    to_date: {
        type: Date, 
        required: false,
    },
    for_class: {
        type: String,
        required: false
    },
    isExcused: {
        type: Boolean,
        default: false,
        required: true
    }
});

export default mongoose.model('Absence', studentAbsenceSchema);