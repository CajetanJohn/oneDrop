// fetchMusicRequest.js
const { connectDb, disconnectDb } = require('../../../mongodb/connect');
const MusicFile = require('../../../mongodb/schema/fileSchema');
const Users = require('../../../mongodb/schema/userSchema');
const Song = require('../../../mongodb/schema/songSchema');

const tableToWatch = Song;


const fetchMusicRequestRoute = (io) => {
  return async (req, res, next) => {
    try {
      const documents = await tableToWatch.find({}, { data: 0 });
      io.emit('documents', documents);

      const changeStream = tableToWatch.watch();
      changeStream.on('change', async (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'save') {
          try {
            const updatedDocuments = await tableToWatch.find({}, { data: 0 });
            io.emit('documents', updatedDocuments);
          } catch (err) {
            console.error('Error fetching updated music files: ' + err);
          }
        }
      });

      next();
    } catch (error) {
      io.emit('error', 'Error handling socket connection');
      next(error);
    }
  };
};

module.exports = fetchMusicRequestRoute;
