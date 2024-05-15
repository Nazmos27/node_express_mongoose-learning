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

app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.post('/', logger, (req : Request, res : Response) =>{
    console.log(req.body);
    res.send("got data")
})

export default app