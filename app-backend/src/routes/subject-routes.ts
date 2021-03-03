import { Router } from 'express';
import { check } from 'express-validator';

import { 
    addNewSubject, 
    addTeachersToSubject, 
    removeTeachersFromSubject,
    deleteSubject, 
    getAllSubjects, 
    getSubjectById, 
    updateSubjectById 
} from '../controllers/subject-controllers';

const subjectRouter = Router();

subjectRouter.post('/', 
    [
        check('subject_name', 'Please enter a valid subject name').not().isEmpty().isLength({min: 2, max: 25}),
        check('for_class', 'Please enter a valid class').not().isEmpty().trim()
    ],
    addNewSubject
);

subjectRouter.get('/', getAllSubjects);

subjectRouter.get('/:id', getSubjectById);

subjectRouter.delete('/:id', deleteSubject);

subjectRouter.put('/:id', 
    [
        check('subject_name', 'Please enter a valid subject name').not().isEmpty().isLength({min: 2, max: 25}),
        check('for_class', 'Please enter a valid class').not().isEmpty().trim()
    ],
    updateSubjectById
);

subjectRouter.put('/add-teacher/:id', addTeachersToSubject);

subjectRouter.put('/pull-teacher/:id', removeTeachersFromSubject);

export default subjectRouter