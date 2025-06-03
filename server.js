const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { database } = require('./src/config/firebase'); // Firebase DB

dotenv.config(); // Load environment variables
require('dotenv').config({ path: __dirname + '/process.env' });
console.log("Email User:", process.env.EMAIL_USER); // Debugging linija
console.log("Email Pass:", process.env.EMAIL_PASS ? "Loaded" : "Not loaded");

const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON parsing

// GraphQL Schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    image: String!
  }

  type Query {
    products: [Product]
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    products: async () => {
      try {
        const snapshot = await database.ref('products').once('value');
        const productsData = snapshot.val();
        if (!productsData) return [];
        return Object.keys(productsData).map(id => ({
          id,
          ...productsData[id]
        }));
      } catch (error) {
        console.error('Error fetching products from Firebase:', error);
        return [];
      }
    }
  }
};

// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files
  app.use(express.static(path.join(__dirname, 'public')));

  // 📩 Email Route using Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
    try {
      await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      });
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    }
  });

  // Start Express Server
  app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
