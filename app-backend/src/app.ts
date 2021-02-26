import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import studentsRouter from './routes/student-routes';
import subjectRouter from './routes/subject-routes';
import classRouter from './routes/class-routes';
import teacherRouter from './routes/teacher-routes';
import notesRouter from './routes/note-routes';

import ConnectDB from './db';

const app = express();

ConnectDB();

app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/students/', studentsRouter);
app.use('/api/subjects/', subjectRouter);
app.use('/api/teachers/', teacherRouter);
app.use('/api/classes/', classRouter);
app.use('/api/notes/', notesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));