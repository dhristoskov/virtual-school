import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import Subject from '../db-models/subject';
import Teacher from '../db-models/teacher';
import SubjectInterface from '../interfaces/subject-interface';
import TeacherInterface from '../interfaces/teacher-interface';

export const getAllSubjects = async ( req: Request, res: Response ) => {
    let subjects: SubjectInterface[] = [];
    try{
        subjects = await Subject.find().sort({subject_name: 1}).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Fatching subjects failed, please try again'});
    }

    if(!subjects || subjects.length === 0){
        return res.status(404).json({msg: 'Could not find any subjects'});
    };

    res.json({ subjectData: subjects });
};

export const getSubjectById = async ( req: Request, res: Response )  => {

    let singleSubject: SubjectInterface | null = null;
    try{
        singleSubject = await Subject.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the subject'});
    }
    if(!singleSubject){
        return res.status(404).json({ msg: 'Subject not found' });
    }

    res.json({subject: singleSubject });
};

export const addNewSubject = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const { subject_name, for_class } = req.body;

        let subjectToCheck: SubjectInterface | null = null;
        try{
            subjectToCheck = await Subject.findOne({subject_name, for_class}).exec();         
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Could not find that teacher.'});
        };

        if(subjectToCheck) {
            return res.status(422).json({ msg: 'Subject already exists.' })
        }

        try {
            const subject: SubjectInterface = new Subject({
                subject_name, 
                for_class,
                teachers: [] 
            });
            const newSubject: SubjectInterface = await subject.save();
            res.status(201).json({ subject: newSubject });
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Creating a new subject entry failed, please try again'});
        };
};

export const deleteSubject = async ( req: Request, res: Response ) => {

    let subjectToDelete: SubjectInterface | null = null;
    try {
        subjectToDelete = await Subject.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the subject')
    }

    if(!subjectToDelete){
        return res.status(404).json({ msg: 'Could not find subject with that id' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        for (const teacher of subjectToDelete.teachers) {
            const teacherToRemove: TeacherInterface | null =  await Teacher.findById(teacher);
            if(teacherToRemove){
                teacherToRemove.teaching_subjects = teacherToRemove.teaching_subjects
                .filter(item => item.toString() !== req.params.id);
                await teacherToRemove.save({session: session});
            }
        }
        await subjectToDelete.remove({session: session});
        await session.commitTransaction();
        res.status(200).json({msg: 'Subject Deleted.'});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};

export const updateSubjectById  = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const { subject_name, for_class } = req.body;

    let subjectToUpdate: SubjectInterface | null = null;
    try{
        subjectToUpdate = await Subject.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the subject'});
    }
    
    if(!subjectToUpdate){
        return res.status(404).json({ msg: 'Subject not found' });
    }

    try {
        subjectToUpdate = await Subject.findByIdAndUpdate( 
            req.params.id, 
            {
                subject_name: subject_name || subjectToUpdate.subject_name,
                for_class: for_class || subjectToUpdate.for_class,
            }, 
            { new: true}
        );
        await subjectToUpdate?.save();
        res.status(200).json({ subject: subjectToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the subject'});
    }
};

export const addTeachersToSubject  = async ( req: Request, res: Response ) => {

    const { teachers } = req.body;

    let subjectToUpdate: SubjectInterface | null = null;
    try{
        subjectToUpdate = await Subject.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the subject'});
    }
    
    if(!subjectToUpdate){
        return res.status(404).json({ msg: 'Subject not found' });
    }

    let teacherToSave: TeacherInterface | null = null;
    try{
        teacherToSave = await Teacher.findById(teachers).exec();         
    }catch(err) {
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Could not find that teacher.'});
    };

    if(!teacherToSave) {
        return res.status(404).json({ msg: 'Teacher not found' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        subjectToUpdate.teachers.push(teacherToSave);
        await subjectToUpdate.save({session: session})
        teacherToSave.teaching_subjects.push(subjectToUpdate);
        await teacherToSave.save({session: session});
        await session.commitTransaction();
        res.status(200).json({ subject: subjectToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the subject'});
    }
};

export const removeTeachersFromSubject  = async ( req: Request, res: Response ) => {

    const { teachers } = req.body;

    let subjectToUpdate: any;
    try{
        subjectToUpdate = await Subject.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the subject'});
    }
    
    if(!subjectToUpdate){
        return res.status(404).json({ msg: 'Subject not found' });
    }

    let teacherToSave: TeacherInterface | null = null;
    try{
        teacherToSave = await Teacher.findById(teachers).exec();         
    }catch(err) {
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Could not find that teacher.'});
    };

    if(!teacherToSave) {
        return res.status(404).json({ msg: 'Teacher not found' });
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        teacherToSave.teaching_subjects = teacherToSave.teaching_subjects
        .filter(item => item.toString() !== req.params.id);
        await teacherToSave.save({session: session});
        subjectToUpdate.teachers.pull(teacherToSave);
        await subjectToUpdate.save({session: session})
        await session.commitTransaction();
        res.status(200).json({ subject: subjectToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the subject'});
    }
};