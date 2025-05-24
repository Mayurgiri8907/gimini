const express = require('express');
const app = express();
const main = require('./util/textgenreate');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
      description: 'API to handle user queries',
    },
  },
  apis: ['./index.js'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({extended : true}));
app.use(express.json());


/**
 * @swagger
 * /:
 *   post:
 *     summary: Handle user query and return response
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               que:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response from main function
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 */
app.get("/", (req,res) => {
    res.send("Hello <br><br>this is a gimini chat boad <br><br><br> the api documation this /api-docs");
})
app.post("/",async (req,res) =>{
    try {
        
        msg = req.body.que;
        const response = await main(msg);
        res.send(response);
    } catch (error) {
        console.log('internal server error');
    }
})


app.listen(3000);