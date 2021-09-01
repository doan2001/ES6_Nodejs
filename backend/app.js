import express from  'express';
import morgan from  'morgan';
import dotenv from  'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import pug from 'pug';
import expressValidator from 'express-validator';
import methodOverride from 'method-override';

// router
import indexRouter from './routes/index';

import productRouter from './routes/product';
import categoryRouter from './routes/category';
import slideRouter from './routes/slide';
import authRouter from './routes/auth';
import commentRouter from './routes/comment';
import feedbackRouter from './routes/feedback';
import userRouter from './routes/user';
import postRouter from './routes/post';
import catePostRouter from './routes/catePost';
import orderRouter from './routes/order';
import cartRouter from './routes/cart';


const app = express();

// middle
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use(expressValidator());
app.use(methodOverride('_method'))
app.use(cors({ credentials: 'same-origin' }));


// app.set('views', './views');
// app.set('view engine', 'pug');
// app.use(express.static('public'));

// connect db 
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('db connect');
})

mongoose.connection.on('error', (err) => {
    console.log(`db connection error: ${err.message}`);
})

const port = process.env.PORT || 6000;


// routes
app.use('/', indexRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', slideRouter);
app.use('/api', authRouter);
app.use('/api', commentRouter);
app.use('/api', feedbackRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', catePostRouter);
app.use('/api', orderRouter);
app.use('/api', cartRouter);


app.get('/', (req, res) => {
    res.send('Hello World! 123')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});