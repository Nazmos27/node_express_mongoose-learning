import express, { NextFunction, Request, Response } from 'express';


const app = express()
const port = 3000

app.use(express.json())
app.use(express.text())

//creating middleware

const logger = (req : Request, res : Response, next : NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
}

//creating router

const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/',userRouter)
app.use('/',courseRouter)

userRouter.post('/api/v1/users/create-user',(req: Request, res : Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success : true,
    message : "User created successfully",
    data : user
  })
})
courseRouter.post('/api/v1/courses/new-course',(req: Request, res : Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success : true,
    message : "course created successfully",
    data : course
  })
})

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.post('/', logger, (req : Request, res : Response) =>{
    console.log(req.body);
    res.send("got data")
})

export default app