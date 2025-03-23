import express from 'express';
import Joi from 'joi'
import { json } from 'express';
const app = express();
app.use(express.json());



app.use(express.json()); // JSON formatidagi ma'lumotlarni ishlash uchun
app.use(express.urlencoded({ extended: true })); // URL-encoded ma'lumotlarni ishlash uchun

const books =[
    {id: 1, name : 'rich and poor dad'},
    {id: 2, name : 'good to great'},
    {id: 3, name : 'the war of art'}
]
console.log(books)
// server qurishni boshlaymiz

// bu get methodi orqali '/' url da salom degan sozni chiqarish
app.get('/',(req, res) => {
    res.send('Salom');  
});

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
  const book = books.find(b => b.id = parseInt(req.params.id));
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