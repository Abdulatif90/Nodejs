function logger(req, res, next) {
  console.log('Logging...');
  next();
}

export default logger;
// module.exports = function(req, res, next) {  // bu ham shu funksiyani export qilish uchun ishlatiladi
//   console.log('Logging...'); 