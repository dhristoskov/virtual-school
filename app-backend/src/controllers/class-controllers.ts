import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import Class from '../db-models/class';
import Teacher from '../db-models/teacher';

import ClassInterface from '../interfaces/class-interface';
import TeacherInterface from '../interfaces/teacher-interface';

export const getAllClasses = async ( req: Request, res: Response ) => {
    let classes: ClassInterface[] = [];
    try{
        classes = await Class.find().sort({first_name: 1}).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Fatching classes failed, please try again'});
    }

    if(!classes || classes.length === 0){
        return res.status(404).json({msg: 'Could not find any classes'});
    };

    res.json({ classesData: classes });
};

export const addNewClass = async ( req: Request, res: Response ) => {

    let teacherToSave: TeacherInterface | null = null;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const { 
        class_number,
        class_name,
        class_profile,
        lead_teacher
     } = req.body;

        try{
            teacherToSave = await Teacher.findById(lead_teacher).exec();         
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Could not find that teacher.'});
        };

        if(!teacherToSave) {
            return res.status(404).json({ msg: 'Teacher not found' });
        };

        try {
            const classToSave: ClassInterface = new Class({
                class_number,
                class_name,
                class_profile,
                lead_teacher,
                students: [],
                subjects: []
            });
            const newClass: ClassInterface = await classToSave.save();
            res.status(201).json({ class: newClass });
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Creating a new class entry failed, please try again'});
        };
};

//To change it so all students have to be removed form the class
export const deleteClassById = async ( req: Request, res: Response ) => {

    let classToDelete: ClassInterface | null = null;
    try {
        classToDelete = await Class.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the class')
    }

    if(!classToDelete){
        return res.status(404).json({ msg: 'Could not find class with that id' });
    }

    try {
        await Class.findByIdAndRemove(req.params.id).exec();
        res.status(200).json({msg: 'Class Deleted.'});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};