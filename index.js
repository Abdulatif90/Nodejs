import express from 'express'; // express modulini ishlatish uchun ishlatiladi
import books from './routes/books.js'; // books.js faylini ishlatish uchun ishlatiladi
import logger from './middleware/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import home from './routes/home.js'; // home.js faylini ishlatish uchun ishlatiladi
const app = express();


// bu middleware funksiya, bu funksiya orqali JSON formatidagi ma'lumotlarni ishlash uchun
// bu middleware funksiya, bu funksiya orqali URL-encoded ma'lumotlarni ishlash uchun

app.use(express.json()); // JSON formatidagi ma'lumotlarni ishlash uchun
app.use(express.urlencoded({ extended: true })); // html formalari orqali yaratilgan ma'lumotlarni serverga post qilib uni urlencoded formatida qabul qilish uchun
app.use(logger);// logger modulini ishlatish uchun, bu modul serverga kelgan so'rovlarni konsolga chiqarish uchun ishlatiladi
app.use(helmet());// helmet modulini ishlatish uchun, bu modul serverni xavfsizligini oshirish uchun ishlatiladi
app.use(morgan('tiny')); // morgan modulini ishlatish uchun, bu modul serverga kelgan so'rovlarni konsolga chiqarish uchun ishlatiladi
app.use(express.static('public')); // public papkani static fayllarini ishlash uchun
// app.use(express.static('public')); // public papkani static fayllarini ishlash uchun
app.set('view engine', 'pug'); // pug modulini ishlatish uchun, bu modul serverda view engine sifatida ishlatiladi
app.set('views', './views'); // views papkasini serverda view engine sifatida ishlatish uchun ishlatiladi
app.use('/api/books', books); // books.js faylini ishlatish uchun ishlatiladi
app.use('/', home); // home.js faylini ishlatish uchun ishlatiladi

//custom middleware funksiya
// bu middleware funksiya, bu funksiya orqali serverga kelgan so'rovni konsolga chiqarish uchun ishlatiladi
console.log(process.env.NODE_ENV);
if (app.get('env') === 'development') { // agar dastur developmentda ishga tushsa
    app.use(morgan('tiny')); // morgan modulini ishlatish uchun, bu modul serverga kelgan so'rovlarni konsolga chiqarish uchun ishlatiladi
    console.log('Morgan ishga tushdi...'); // morgan modulini ishga tushirish
} else {
    console.log('Morgan ishga tushmadi...'); // morgan modulini ishga tushirmaslik
};
// bu middleware funksiya, bu funksiya orqali serverga kelgan so'rovni konsolga chiqarish uchun ishlatiladi 

console.log(app.get('env')); // get funksiyasi orqali env ni olish. env - bu dastur qaysi holatda ishga tushganini ko'rsatadi
// app.get('env') orqali dastur qaysi holatda ishga tushganini aniqlash. agar dastur developmentda ishga tushsa, konsolga 'Development' degan so'z chiqadi
// agar dastur productionda ishga tushsa, konsolga 'Production' degan so'z chiqadi
// agar dastur testda ishga tushsa, konsolga 'Test' degan so'z chiqadi  
// agar dastur developmentda ishga tushsa, konsolga 'Development' degan so'z chiqadi

// console.log('Application Name:', config.get('name')); // config.get('name') orqali config papkasidagi name ni olish
// console.log('Localhost:', config.get('database.host')); // config.get('mail.host') orqali config papkasidagi mail.host ni olish
// console.log('password',config.get('database.password')); // config.get('database.password') orqali config papkasidagi database.password ni olish



app.get('/',(req, res) => {
  // res.send('Salom');
  res.render('index', { title: 'My Express App', message: 'Assalomu alaykum!' }); // pug modulini ishlatish uchun ishlatiladi  
});
// render funksiyasi orqali index.pug faylini chiqarish

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is connected url: http://localhost:${port}/`);
});