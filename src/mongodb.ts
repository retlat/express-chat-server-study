import {MongoClient} from 'mongodb';
import * as util from 'util';

const setTimeoutPromise = util.promisify(setTimeout);

const uri = process.env.MONGO_URI;
if (uri === undefined) {
  throw new Error('MongoDB connection string not defined');
}

const createClient = () => new MongoClient(uri, {
  useNewUrlParser: true
});

const client = createClient();

export const connect = async () => {
  const acceptRetry = 4;

  for (let i = 0; i < acceptRetry; i++) {
    try {
      if (i !== 0) {
        await setTimeoutPromise(500);
      }

      return await client.connect();
    } catch (e) {
      console.log(e);
    }
  }

  return await client.connect();
};

export const disconnect = () => {
  if (!client.isConnected()) {
    return;
  }

  client.close(true);
};

export const driver = () => client;
