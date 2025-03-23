import express from 'express';
import Joi from 'joi';
const router = express.Router();

const books =[
    {id: 1, name : 'rich and poor dad'},
    {id: 2, name : 'good to great'},
    {id: 3, name : 'the war of art'}
]
console.log(books)
// server qurishni boshlaymiz

// bu get methodi orqali '/' url da salom degan sozni chiqarish

// get methodi orqali '/'  urlda kitoblar arrayini chiqarish
router.get('/',(req,res) =>{
    res.send(books); // bu loyihaning 2 step/ bunda kitoblar oldindan basega kiritilib kn larni chaqirish
    // res.send(['rich and poor dad','good to great', 'the war of art'])  // dastlabki etab - bundan shu urlda kitoblar array chiqadi
})

//app obyektining post methodi orqali serverga malumot kiritish

//validate qilishdan oldin schema yaratib olish kerak .
//schemada talab qilingan min malumotlarni type va aniq mavjud bo`lishligi yozilishi kerak
// bu validate Joi orqali amalga oshiriladi

router.post('/', (req, res) => {
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
router.get('/:id',(req,res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book){
     return  res.status(404).send('Berilgan ID ga teng kitob topilmadi');
    }    
  
      res.send(book) 
})    

router.put('/:id', (req, res) => {
 
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

router.delete('/:id',(req,res) =>{
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


// module.exports = router; // CommonJS module system
export default router; // ES module system