import mongoose from 'mongoose'; 
import entry from '../models/entryModel.js';
import * as moment from 'moment';

exports.getEntry = (req, res) => {
    let id = req.params.entryId
    if (id == 'today') {
        let todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        let todayEnd = new Date();
        todayEnd.setHours(23,59,59,999);
        entry.findOne(
            {date: { $gte: todayStart, $lt: todayEnd }},
            (err, entry) => {
                if (err) {
                    res.send(err);
                }

                res.json(entry);
        })
    } else {
        entry.findById(id, (err, entry) => {
            if (err) {
                res.send(err);
            }

            res.json(entry);
        });
    }
};

exports.getAllEntries = (req, res) => {
    let year = req.params.year
    let month = req.params.month

    let rangeStart = null;
    let rangeStop = null;
    
    if (year || month) {
        rangeStart = Moment.moment();
        rangeStart.year(year ? year : rangeStart.year())
        rangeStart.month(month ? month : 0)
        rangeStart.startOf(month ? 'month' : 'year')

        rangeEnd = Moment.moment();
        rangeEnd.year(year ? year : rangeStart.getFullYear())
        rangeEnd.month(month ? month : 11)
        rangeEnd.endOf(month ? 'month' : 'year')
    }
    entry.find(year || month ? {date: { $gte: rangeStart, $lt: rangeEnd }} : {}, (err, entries) => {
        if (err) {
            res.send(err);
        }

        res.json(entries);
    })
    .sort({ date: -1 });
};

exports.createEntry = (req, res) => {
    const newEntry = new entry(req.body);

    newEntry.save((err, entry) => {
        if (err) {
            res.send(err);
        }

        res.json(entry);
    });
};

exports.updateEntry = (req, res) => {
    entry.findOneAndUpdate({
        _id: req.params.entryId
    }, req.body,
        (err, entry) => {
            if (err) {
                res.send(err);
            }

            res.json(entry);
        });
};

exports.deleteEntry = (req, res) => {
    entry.remove({
        _id: req.params.entryId
    }, (err) => {
        if (err) {
            res.send(err);
        }

        res.json({
            message: `entry ${req.params.entryId} successfully deleted`
        });
    });
};