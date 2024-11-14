// netlify/functions/submitEmail.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Securely retrieve MongoDB URI from environment variables
let client;

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
        // Initialize MongoDB client
        if (!client) {
            client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
        }

        const database = client.db('maubank');
        const collection = database.collection('emails');

        // Insert email document
        await collection.insertOne({ email: email, timestamp: new Date() });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email submitted successfully!' }),
        };
    } catch (error) {
        console.error('Error storing email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
