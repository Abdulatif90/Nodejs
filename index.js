import express from 'express';
import Joi from 'joi';
import logger from '../Nodejs/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';

import config from 'config'; // config moduli shu yerda import qilinadi


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


app.use(function(req, res, next)  {
    console.log('Middleware ishga tushdi...');
    next(); // keyingi middleware funksiyasiga o'tish, agar yo'qsa, keyingi middleware funksiyasiga o'tmaydi va serverni to'xtatadi
});

const books =[
    {id: 1, name : 'rich and poor dad'},
    {id: 2, name : 'good to great'},
    {id: 3, name : 'the war of art'}
]
console.log(books)
// server qurishni boshlaymiz

// bu get methodi orqali '/' url da salom degan sozni chiqarish
app.get('/',(req, res) => {
    // res.send('Salom');
    res.render('index', { title: 'My Express App', message: 'Assalomu alaykum!' }); // pug modulini ishlatish uchun ishlatiladi  
});
// render funksiyasi orqali index.pug faylini chiqarish
// get methodi orqali '/api/books'  urlda kitoblar arrayini chiqarish
app.get('/api/books',(req,res) =>{
    res.send(books); // bu loyihaning 2 step/ bunda kitoblar oldindan basega kiritilib kn larni chaqirish
    // res.send(['rich and poor dad','good to great', 'the war of art'])  // dastlabki etab - bundan shu urlda kitoblar array chiqadi
})

//app obyektining post methodi orqali serverga malumot kiritish

//validate qilishdan oldin schema yaratib olish kerak .
//schemada talab qilingan min malumotlarni type va aniq mavjud bo`lishligi yozilishi kerak
// bu validate Joi orqali amalga oshiriladi

app.post('/api/books', (req, res) => {
   const {error} = validateBook(req.body);
  if (error) {
    // Agar xato bo'lsa, 401 status kodi bilan xatoni yuboring
    //res.status(401).send(result.error.details);// hatoni complex olish
     res.status(401).send(error.details[0].message);// bu complex hatoni faqat massage qismini beradi holos
    }
     // Schema yaratish
  const book = {
    id : books.length+1,
    name : req.body.name
  };
  books.push(book);
  return res.status(201).send(book); 
  });
    

// GET methodi orqali data larni Id bilan chaqirib olish
app.get('/api/books/:id',(req,res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book){
     return  res.status(404).send('Berilgan ID ga teng kitob topilmadi');
    }    
  
      res.send(book) 
})    

app.put('/api/books/:id', (req, res) => {
 
  //kitobni bazadan izlab topish
  //kitob mavjud bolmasa, 404 hatoni qaytarish
  const book = books.find(b => b.id === parseInt(req.params.id));
  
      if (!book){
     return  res.status(404).send('Berilgan ID ga teng kitob topilmadi');
    }   
  //agar kitob topilsa sorovni validate qilish
  
  const {error} = validateBook(req.body);

  //agar validate dan o'tmasa 400 error ni qaytarish
  if (error) {
    
    // Agar xato bo'lsa, 401 status kodi bilan xatoni yuboring
    //res.status(401).send(result.error.details);// hatoni complex olish
    return res.status(401).send(result.error.details[0].message);// bu complex hatoni faqat massage qismini beradi holos
  }
  //kitobni yangiliash
  book.name = req.body.name;
  
  //yangilangan kitobni qaytarish
   return res.send(book); 
}
);

app.delete('/api/books/:id',(req,res) =>{
  //kitobni id si boyicha topamiz
  const book = books.find(b => b.id = parseInt(req.params.id)); //parseInt orqali stringni numberga aylantirish
  // topilmasa error 404 beramiz
  if(!book){
    return res.status(404).send('Berilgan ID ga teng kitob topilmadi');
  }
  //topilsa delete qilamiz
  const bookIndex = books.indexOf(book);// kitobni indexsini topadi
  books.splice(bookIndex, 1); // splice orqali shu indexdan nechta item ni ochirish buyrugi
  // ochirilgan kitobni qaytarib beramiz
  return res.send(book);
});

function validateBook(book){
  const bookSchema = {
    name: Joi.string().required().min(3)
  };
  return Joi.object(bookSchema).validate(book);
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is connected url: http://localhost:${port}/`);
});