import { Router } from 'express';
import { check } from 'express-validator'

import { 
    addNewTeacher, 
    deleteTeacher, 
    getAllTeachers,
    getTeacherById, 
    updateTeacherById 
} from '../controllers/teacher-controllers';

const teacherRouter = Router();

teacherRouter.post('/',
    [
        check('first_name', 'Please enter a valid first name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('second_name', 'Please enter a valid second name').isLength({ max: 20 }),
        check('last_name', 'Please enter a valid last name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('city', 'Please enter a valid city name').not().isEmpty().isLength({ min: 2 }),
        check('address', 'Please enter a valid address').not().isEmpty().isLength({ min: 2 }),
        check('phone_number', 'Please enter a valid phone number').not().isEmpty().isLength({ min: 5}).trim(),
        check('email',  'Please enter a valid email address').not().isEmpty().isEmail().normalizeEmail(),
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
    addNewTeacher
);

teacherRouter.get('/', getAllTeachers);

teacherRouter.get('/:id', getTeacherById);

teacherRouter.delete('/:id', deleteTeacher);

teacherRouter.put('/:id',
    [
        check('first_name', 'Please enter a valid first name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('second_name', 'Please enter a valid second name').isLength({ max: 20 }),
        check('last_name', 'Please enter a valid last name').not().isEmpty().isLength({ min: 2, max: 20 }),
        check('city', 'Please enter a valid city name').not().isEmpty().isLength({ min: 2 }),
        check('address', 'Please enter a valid address').not().isEmpty().isLength({ min: 2 }),
        check('phone_number', 'Please enter a valid phone number').not().isEmpty().isLength({ min: 5}).trim(),
        check('email',  'Please enter a valid email address').not().isEmpty().isEmail().normalizeEmail(),
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
    updateTeacherById
);

export default teacherRouter