import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import Student from '../db-models/student';
import Class from '../db-models/class';

import ClassInterface from '../interfaces/class-interface';
import StudentInterface from '../interfaces/student-interface';

export const getAllStudents = async ( req: Request, res: Response ) => {
    let students: StudentInterface[] = [];
    try{
        students = await Student.find().sort({first_name: 1}).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Fatching students failed, please try again'});
    }

    if(!students || students.length === 0){
        return res.status(404).json({msg: 'Could not find any students'});
    };

    res.json({ studentsData: students });
};

export const getStudentById = async ( req: Request, res: Response )  => {

    let singleStudent: StudentInterface | null = null;
    try{
        singleStudent = await Student.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Can not find the student'});
    }
    if(!singleStudent){
        return res.status(404).json({ msg: 'Student not found' });
    }

    res.json({student: singleStudent });
};

export const getStudentsByClass = async ( req: Request, res: Response ) => {

    let requestedClass: ClassInterface | null = null;
    try {
        requestedClass = await Class.findById(req.params.id).populate('students').exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the class')
    }

    if(!requestedClass || requestedClass.students.length === 0){
        return res.status(404).json({ msg: 'Could not show students for this Class' });
    }

    res.status(200).json({students: requestedClass.students});

};

export const addNewStudent = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const {
        first_name, 
        second_name,
        last_name,
        parent,
        family_doctor,
        city,
        address,
        number_in_class,
        phone_number,
        sex,
        study_from,
        ident_number,
        data_of_birth,
        image,
        school_class
    } = req.body;

    let schoolClass: ClassInterface | null = null;
    try{
        schoolClass = await Class.findById(school_class).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the subject'});
    }
    
    if(!schoolClass){
        return res.status(404).json({ msg: 'Subject not found' });
    }

        try {
            const student: StudentInterface = new Student({
                first_name, 
                second_name,
                last_name,
                parent,
                family_doctor,
                city,
                address,
                number_in_class,
                phone_number,
                sex,
                study_from,
                ident_number,
                data_of_birth,
                image,
                other_activities: [],
                badges: [],    
                notes: [],      
                school_class
            });
            const session = await mongoose.startSession();
            session.startTransaction();
            await student.save({session: session});
            schoolClass.students.push(student);
            await schoolClass.save({session: session});
            await session.commitTransaction();

            res.status(201).json({ student });
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Creating a new student entry failed, please try again'});
        };
};

export const deleteStudentById = async ( req: Request, res: Response ) => {

    let studentToDelete: StudentInterface | null = null;
    try {
        studentToDelete = await Student.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the student')
    }

    if(!studentToDelete){
        return res.status(404).json({ msg: 'Could not find student with that id' });
    };

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const classToDelete: ClassInterface | null = await Class.findById(studentToDelete.school_class)
        if( classToDelete ){
            classToDelete.students = classToDelete.students.filter(item => item.toString() !== req.params.id);
            await classToDelete.save({session: session});
        } 
        await studentToDelete.remove({session: session});
        await session.commitTransaction();
        res.status(200).json({msg: 'Student Deleted.'});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};

export const updateStudentById  = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const {
        first_name, 
        second_name,
        last_name,
        parent,
        family_doctor,
        city,
        address,
        number_in_class,
        phone_number,
        sex,
        study_from,
        ident_number,
        data_of_birth,
        image,
        other_activities,
        badges
    } = req.body;

    let studentToUpdate: any;
    try{
        studentToUpdate = await Student.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the student'});
    }
    
    if(!studentToUpdate){
        return res.status(404).json({ msg: 'Student not found' });
    }

    try {
        studentToUpdate = await Student.findByIdAndUpdate( 
            req.params.id, 
            {
                first_name: first_name || studentToUpdate.first_name,
                second_name: second_name || studentToUpdate.second_name,
                last_name: last_name || studentToUpdate.last_name,
                parent: parent || studentToUpdate.parent,
                family_doctor: family_doctor || studentToUpdate.family_doctor,
                city: city || studentToUpdate.city,
                address: address || studentToUpdate.address,
                number_in_class: number_in_class || studentToUpdate.number_in_class,
                phone_number: phone_number || studentToUpdate.phone_number,
                sex: sex || studentToUpdate.sex,
                study_from: study_from || studentToUpdate.study_from,
                ident_number: ident_number || studentToUpdate.ident_number,
                data_of_birth: data_of_birth || studentToUpdate.data_of_birth,
                image: image || studentToUpdate.image,
                other_subjects: other_activities || studentToUpdate.other_activities,    
                badges: badges || studentToUpdate.badges
            }, 
            { new: true}
        );
        await studentToUpdate.save();
        res.status(200).json({ student: studentToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the student'});
    }
};

export const changeStudentsClass = async ( req: Request, res: Response )  => {

    const { school_class } = req.body;

    let studentToUpdate: StudentInterface | null = null;
    try {
        studentToUpdate = await Student.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the student')
    }

    if(!studentToUpdate){
        return res.status(404).json({ msg: 'Student not found' });
    }

    let classToUpdate: ClassInterface | null = null;
    try {
        classToUpdate = await Class.findById(school_class).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the class')
    }

    if(!classToUpdate){
        return res.status(404).json({ msg: 'Class not found' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const oldClass: ClassInterface | null = await Class.findById(studentToUpdate.school_class);
        if( oldClass ){
            oldClass.students = oldClass.students.filter(item => item.toString() !== req.params.id);
            await oldClass.save({session: session});
        } 
        classToUpdate.students.push(studentToUpdate);
        await classToUpdate.save({ session: session })
        studentToUpdate.school_class = classToUpdate;
        await studentToUpdate.save({session: session});
        await session.commitTransaction();

        res.status(200).json({student: studentToUpdate});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};
