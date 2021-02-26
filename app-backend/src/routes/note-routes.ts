import { Router } from 'express';
import { check } from 'express-validator';

import { 
    addNewNote, 
    getNoteById,
    updateNoteById,
    deleteNoteById
} from '../controllers/note-controllers';

const notesRouter = Router();

notesRouter.post('/', 
    [
        check('title', 'Please enter a valid title').not().isEmpty().isLength({ min: 2, max: 70 }),
        check('content', 'Please enter content longer then 10 symbols').not().isEmpty().isLength({ min: 10 }),
        check('create_date', 'Please enter a valid creation date').isISO8601().toDate() 
            .custom((value, {req}) => {
                if(value > Date.now()){
                    throw new Error('Invalide date');
                }
                return true;
            })
    ],
    addNewNote
);

notesRouter.get('/:id', getNoteById);

notesRouter.delete('/:id', deleteNoteById);

notesRouter.put('/:id',
    [
        check('title', 'Please enter a valid title').not().isEmpty().isLength({ min: 2, max: 70 }),
        check('content', 'Please enter content longer then 10 symbols').not().isEmpty().isLength({ min: 10 }),
    ],
    updateNoteById
);

export default notesRouter