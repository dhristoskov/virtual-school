import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

import Note from '../db-models/note';
import Student from '../db-models/student';

import NoteInterface from '../interfaces/note-interface';
import StudentInterface from '../interfaces/student-interface';

export const addNewNote = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const { title, content, create_date, student_target } = req.body;

    let student: StudentInterface | null = null;
    try{
        student = await Student.findById(student_target).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Can not find the student'});
    }
    if(!student){
        return res.status(404).json({ msg: 'Student not found' });
    }

        try {
            const note: NoteInterface = new Note({
                title, 
                content,
                create_date,
                student_target
            });

            const session = await mongoose.startSession();
            session.startTransaction();
            await note.save({session: session});
            student.notes.push(note);
            await student.save({session: session});
            await session.commitTransaction();

            res.status(201).json({ note });
        }catch(err) {
            console.error(err.message || 'Something went wrong');
            res.status(500).send({msg: 'Creating a new note entry failed, please try again'});
        };
};

export const getNoteById = async ( req: Request, res: Response )  => {

    let singleNote: NoteInterface | null = null;
    try{
        singleNote = await Note.findById(req.params.id).populate('student_target').exec();
    }catch(err){
        console.error(err.message || 'Something went wrong');
        res.status(500).send({msg: 'Can not find the note'});
    }
    if(!singleNote){
        return res.status(404).json({ msg: 'Note not found' });
    }

    res.json({note: singleNote });
};

export const updateNoteById = async ( req: Request, res: Response ) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()});
    }

    const {
        title, 
        content,
    } = req.body;

    let noteToUpdate: any;
    try{
        noteToUpdate = await Note.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not find the note'});
    }
    
    if(!noteToUpdate){
        return res.status(404).json({ msg: 'Note not found' });
    }

    try {
        noteToUpdate = await Note.findByIdAndUpdate( 
            req.params.id, 
            {
                title: title || noteToUpdate.title,
                content: content || noteToUpdate.content,
            }, 
            { new: true}
        );
        await noteToUpdate.save();
        res.status(200).json({ note: noteToUpdate});
    }catch(err){
        console.error(err.message);
        res.status(500).send({msg: 'Can not update the note'});
    }
};

export const deleteNoteById = async ( req: Request, res: Response ) => {

    let noteToDelete: NoteInterface | null = null;
    try {
        noteToDelete = await Note.findById(req.params.id).exec();
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Can not find the note')
    }

    if(!noteToDelete){
        return res.status(404).json({ msg: 'Could not find the note' });
    };

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const studentNote: StudentInterface | null = await Student.findById(noteToDelete.student_target)
        if( studentNote ){
            studentNote.notes = studentNote.notes.filter(item => item.toString() !== req.params.id);
            await studentNote.save({session: session});
        } 
        await noteToDelete.remove({session: session});
        await session.commitTransaction();
        res.status(200).json({msg: 'Note Deleted.'});
    }catch(err){
        console.error(err.message || 'Something went wrong')
        res.status(500).send('Server Error')
    }
};