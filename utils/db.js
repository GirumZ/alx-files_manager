const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'file_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = null;
    this.db = null;

    (async () => {
      this.client = await MongoClient.connect(url, { useUnifiedTopology: true });
      this.db = this.client.db(database);
    })();
  }

  isAlive() {
    return this.db !== null;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
