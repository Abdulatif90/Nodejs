import express from 'express';
const app = express();
app.use(express.json());

const books =[
    {id: 1, name : 'rich and poor dad'},
    {id: 2, name : 'good to great'},
    {id: 3, name : 'the war of art'}
]

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

app.post('/api/books',(req,res) =>{
    const book = {
        id : books.length+1,
        name : req.body.name
    };
    books.push(book)
    res.status(201).send(book);
}); 

// GET methodi orqali data larni Id bilan chaqirib olish
app.get('/api/books/:id',(req,res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book){
        res.status(404).send('Berilgan ID ga teng kitob topilmadi');
    }    
  
    //res.send(req.params.id)// bu requestning params objecti bolib bu obyekt orqali id sini chaqirib olamiz
      res.send(book) 
})    
 // sorov : // http://localhost:5000/api/books/1  natija: {"id":1,"name":"rich and poor dad"}
 //http://localhost:5000/api/books/4 - mavjud bolmagan id ni bersak natija : Berilgan ID ga teng kitob topilmadi 
 // statusni tekshirish uchun F12 - networks - ctrl+R  ni bosamiz 

// GET methodi orqali data larni bir nechta parametrlari  bilan chaqirib olish 
//http://localhost:5000/api/articles/2022/10
//natija: {"year":"2022","month":"10"}
// app.get('/api/articles/:year/:month',(req,res) =>{
//     res.send(req.params)  // bu requestning params method bolib bu method orqali id sini chaqirib olamiz
// });

// GET sorovi bilan query larni oqishi uchun req ning query methodidan foydalanamiz
/* bu url dan kn '?' belgisini qo`yish orqali qo`shimcha ma`lumotlar kiritiladi. 
 Misol uchun olinyotgan malumotlarni namelarini sort qilib olish*/
app.get('/api/articles/:year/:month',(req,res) =>{
    res.send(req.query)  // bu requestning params objecti bolib bu obyekt orqali id sini chaqirib olamiz
   // natija: {"sortBy":"name"}
});




const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server is connected url: http://localhost:${port}/`);
});