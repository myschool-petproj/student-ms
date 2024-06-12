import dotenv from "dotenv";
import express, {Express} from "express";

dotenv.config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use(express.json());

// Use the routes
app.use('/students/api', require('./route/versions.route'));

// Handle 404
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Internal Server Error"});
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})