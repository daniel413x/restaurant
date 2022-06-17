import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import sequelize from './db';
import router from './routes/index';
import errorMiddleware from './middleware/errorMiddleware';
import requestLogger from './middleware/requestLogger';
import logger from './middleware/logger';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api/', router);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'www' });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => logger(`server started on port ${PORT}`));
  } catch (e) {
    logger(e);
  }
};

start();
