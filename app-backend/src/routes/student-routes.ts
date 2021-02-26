import { Router } from 'express';
import { check } from 'express-validator';

import { 
    addNewStudent, 
    getAllStudents, 
    getStudentById, 
    deleteStudentById, 
    updateStudentById,
    changeStudentsClass,
    getStudentsByClass
} from '../controllers/students-controllers';

const studentsRouter = Router();

studentsRouter.post('/', 
    [
        check('first_name', 'Please enter a valid first name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('second_name', 'Please enter a valid second name').isLength({ max: 20 }),
        check('last_name', 'Please enter a valid last name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('city', 'Please enter a valid city name').not().isEmpty().isLength({ min: 2 }),
        check('address', 'Please enter a valid address').not().isEmpty().isLength({ min: 2 }),
        check('number_in_class', 'Please enter a valid number in class').not().isEmpty().isNumeric().isInt({ gt: 0, lt: 50 }).trim(),
        check('phone_number', 'Please enter a valid phone number').not().isEmpty().isLength({ min: 5}).trim(),
        check('sex', 'Please enter a valid male, female or other option').not().isEmpty().isIn(['male', 'female', 'other']).trim(),
        check('ident_number', 'Please enter a valid identification number').not().isEmpty().isNumeric().trim(),
        check('data_of_birth', 'Please enter a valid date of birth').isISO8601().toDate() 
            .custom((value, {req}) => {
                if(value >= Date.now()){
                    throw new Error('Invalide date');
                }
                return true;
            })
    ],
    addNewStudent
);

studentsRouter.get('/', getAllStudents);

studentsRouter.get('/:id', getStudentById);

studentsRouter.get('/by-class/:id', getStudentsByClass);

studentsRouter.delete('/:id', deleteStudentById);

studentsRouter.put('/change-class/:id', changeStudentsClass);

studentsRouter.put('/:id',
    [
        check('first_name', 'Please enter a valid first name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('second_name', 'Please enter a valid second name').isLength({ max: 20 }),
        check('last_name', 'Please enter a valid last name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('city', 'Please enter a valid city name').not().isEmpty().isLength({ min: 2 }),
        check('address', 'Please enter a valid address').not().isEmpty().isLength({ min: 2 }),
        check('number_in_class', 'Please enter a valid number in class').not().isEmpty().isNumeric().isInt({ gt: 0, lt: 50 }).trim(),
        check('phone_number', 'Please enter a valid phone number').not().isEmpty().isLength({ min: 5}).trim(),
        check('sex', 'Please enter a valid male, female or other option').not().isEmpty().isIn(['male', 'female', 'other']).trim(),
        check('ident_number', 'Please enter a valid identification number').not().isEmpty().isNumeric().trim(),
        check('data_of_birth', 'Please enter a valid date of birth').isISO8601().toDate() 
            .custom((value, {req}) => {
                if(value >= Date.now()){
                    throw new Error('Invalide date');
                }
                return true;
            })
    ],
    updateStudentById
);

export default studentsRouter