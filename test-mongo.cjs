const { MongoClient } = require("mongodb");

async function testConnection() {
    const uri = process.env.BETTER_AUTH_DB_URL;

    if (!uri) {
        console.log("ERROR: MongoDB URL not loaded");
        return;
    }

    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("SUCCESS: MongoDB connected!");
    } catch (error) {
        console.error("CONNECTION FAILED:", error.message);
    } finally {
        await client.close().catch(() => {});
    }
}

testConnection();