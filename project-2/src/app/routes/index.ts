import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/acaSem.route';
import { AcademicFacultyRoutes } from '../modules/AcademicFaculty/acaFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/acaDepartment.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { SemesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
