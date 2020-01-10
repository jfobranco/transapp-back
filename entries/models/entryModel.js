import mongoose, { Schema } from 'mongoose';

const TranslationSchema = new Schema({
    title: {
        type: String,
        required: "Required"
    },
    text: String,
    language: String,
 });

const EntrySchema = new Schema({
    date: {
        type: Date,
        unique: true
    },
    translations: [TranslationSchema],
 });

export default mongoose.model('Entry', EntrySchema);