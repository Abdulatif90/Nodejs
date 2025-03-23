import express from 'express'; // express modulini ishlatish uchun ishlatiladi
const router = express.Router();

router.get('/home',(req, res) => {
    // res.send('Salom');
   return res.render('index', { title: 'My Express App', message: 'Assalomu alaykum, barchaga!' }); // pug modulini ishlatish uchun ishlatiladi  
  });

export default router; // router modulini ishlatish uchun ishlatiladi