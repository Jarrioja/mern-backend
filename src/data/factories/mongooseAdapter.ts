import mongoose, { Connection, Mongoose } from "mongoose";

class MongooseAdapter {
  private connection!: Connection | null;
  private mongoose!: Mongoose;
  async init(uri: string) {
    this.mongoose = await mongoose.connect(uri);
    this.connection = this.mongoose.connection;
  }
  async close() {
    if (this.mongoose) await this.mongoose.disconnect();
  }

  async clear() {
    if (this.connection) {
      const collections = await this.connection.db.collections();
      for (const collectionName in collections) {
        const collection = collections[collectionName];
        await collection.deleteMany({});
        console.log(`Colección ${collectionName} eliminada.`);
      }
    }
  }
}

export default MongooseAdapter;
