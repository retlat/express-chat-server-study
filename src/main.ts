import * as App from './app';
import * as MongoConnection from './mongodb';

App.run()
  .catch(error => {
    console.error(error);
    MongoConnection.disconnect();
  });
