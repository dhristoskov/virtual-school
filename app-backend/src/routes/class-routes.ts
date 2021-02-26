import { Router } from 'express';
import { check } from 'express-validator';

import { 
    addNewClass, 
    deleteClassById, 
    getAllClasses 
} from '../controllers/class-controllers';

const classRouter = Router();

classRouter.post('/',
    [
        check('class_number', 'Please enter a valid class number').not().isEmpty().isNumeric().isInt({gt: 0}),
        check('class_name', 'Please enter a valid class name').not().isEmpty().isLength({ max: 25 }),
        check('class_profile', 'Please enter a valid class profile').not().isEmpty().isLength({ min: 2, max: 25 })
    ],
    addNewClass
);

classRouter.get('/', getAllClasses);

classRouter.get('/:id');

classRouter.delete('/:id', deleteClassById);

classRouter.patch('/:id', 
    [
        check('class_number', 'Please enter a valid class number').not().isEmpty().isNumeric().isInt({gt: 0}),
        check('class_name', 'Please enter a valid class name').not().isEmpty().isLength({ max: 25 }),
        check('class_profile', 'Please enter a valid class profile').not().isEmpty().isLength({ min: 2, max: 25 })
    ],
);

export default classRouter