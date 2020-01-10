import entry from '../controllers/entryController';

export default (app) => {
    app.route('/entries')
        .get(entry.getAllEntries)
        .post(entry.createEntry);

    app.route('/entries/:entryId')
        .get(entry.getEntry)
        .put(entry.updateEntry)
        .delete(entry.deleteEntry);
};