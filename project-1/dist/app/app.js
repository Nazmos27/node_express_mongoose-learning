"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.text());
//creating middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
//creating router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/', userRouter);
app.use('/', courseRouter);
userRouter.post('/api/v1/users/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User created successfully",
        data: user
    });
});
courseRouter.post('/api/v1/courses/new-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "course created successfully",
        data: course
    });
});
app.get('/', logger, (req, res) => {
    res.send('Hello World!');
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.send("got data");
});
exports.default = app;
