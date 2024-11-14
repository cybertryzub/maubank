const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://rahul19707:l4769YwbK88N2z2M@your_cluster_url.mongodb.net/?retryWrites=true&w=majority';

let client;
let database;

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { email } = JSON.parse(event.body);

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is required' }),
    };
  }

  try {
    // Connect to MongoDB
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
    }

    database = client.db('maubank'); // Database name
    const collection = database.collection('email'); // Collection name

    // Insert email into the collection
    await collection.insertOne({ email: email, timestamp: new Date() });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error storing email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', details: error.message }),
    };
  }
};
