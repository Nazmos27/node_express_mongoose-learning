import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call controller function

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudentData);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;
