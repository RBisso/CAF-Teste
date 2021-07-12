import mongoose from 'mongoose';
import log from '../logger/';
import config from '../config/defaults';

const connect = async () => {
    const dbUri = config.dbUri
    try {
    await mongoose
        .connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => {
            log.info("Databse connected");
        });
    } catch(err) {
        log.info('failed to connect to database', err)
    }
}

export default connect;