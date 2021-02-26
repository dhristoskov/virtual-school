import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import Teacher from '../db-models/teacher';
import Subject from '../db-models/subject';

import TeacherInterface from '../interfaces/teacher-interface';
import SubjectInterface from '../interfaces/subject-interface';

export const addNewTeacher = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    };

    const {
        first_name,
        second_name,
        last_name,
        family_doctor,
        city,
        address,
        phone_number,
        email,
        sex,
        ident_number,
        data_of_birth,
        image, 
    } = req.body;

        try {
            const teacher: TeacherInterface = new Teacher({
                first_name,
                second_name,
                last_name,
                family_doctor,
                city,
                address,
                phone_number,
                email,
                sex,
                ident_number,
                data_of_birth,
                image,
                other_activities: [],
                teaching_subjects: []
            });

            const newTeacher: TeacherInterface = await teacher.save();
            res.status(201).json({ teacher: newTeacher });
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Creating a new teacher entry failed, please try again'});
        };
};

export const getAllTeachers = async ( req: Request, res: Response ) => {
    let teachers: TeacherInterface[] = [];
    try{
        teachers = await Teacher.find().sort({first_name: 1}).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Fatching teachers failed, please try again'});
    }

    if(!teachers || teachers.length === 0){
        return res.status(404).json({msg: 'Could not find any teachers'});
    };

    res.json({ teachersData: teachers });
};

export const getTeacherById = async ( req: Request, res: Response )  => {

    let singleTeacher: TeacherInterface | null = null;
    try{
        singleTeacher = await Teacher.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Can not find the teacher'});
    }
    if(!singleTeacher){
        return res.status(404).json({ msg: 'Teacher not found' });
    }

    res.json({teacher: singleTeacher });
};


export const deleteTeacher = async ( req: Request, res: Response ) => {

    let teacherToDelete: TeacherInterface | null = null;
    try {
        teacherToDelete = await Teacher.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the teacher')
    }

    if(!teacherToDelete){
        return res.status(404).json({ msg: 'Could not find subject with that id' });
    }

    try {
        await Teacher.findByIdAndRemove(req.params.id).exec();
        res.status(200).json({msg: 'Teacher Deleted.'});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};

export const updateTeacherById  = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const {
        first_name,
        second_name,
        last_name,
        family_doctor,
        city,
        address,
        phone_number,
        email,
        sex,
        ident_number,
        data_of_birth,
        other_activities,
        image 
    } = req.body;

    let teacherToUpdate: any;
    try{
        teacherToUpdate = await Teacher.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the teacher'});
    }
    
    if(!teacherToUpdate){
        return res.status(404).json({ msg: 'Teacher not found' });
    }

    try {
        teacherToUpdate = await Teacher.findByIdAndUpdate( 
            req.params.id, 
            {
                first_name: first_name || teacherToUpdate.first_name,
                second_name: second_name || teacherToUpdate.second_name,
                last_name: last_name || teacherToUpdate.last_name,
                family_doctor: family_doctor || teacherToUpdate.family_doctor,
                city: city || teacherToUpdate.city,
                address: address || teacherToUpdate.address,
                phone_number: phone_number || teacherToUpdate.phone_number,
                email: email || teacherToUpdate.email,
                sex: sex || teacherToUpdate.sex,
                ident_number: ident_number || teacherToUpdate.ident_number,
                data_of_birth: data_of_birth || teacherToUpdate.data_of_birth,
                other_activities: other_activities || teacherToUpdate.other_activities,
                image: image || teacherToUpdate.image,
            }, 
            { new: true}
        );
        await teacherToUpdate.save();
        res.status(200).json({ teacher: teacherToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the teacher'});
    }
};
