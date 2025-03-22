// Module package  External 
// const moment = require('moment');
// const time = moment().format('YYYY-MM-DD')
// console.log(time);

// const moment = require('moment');
// setInterval(()=> {
//     const time = moment().format('YYYY-MM-DD');
//     console.log(`Hozirgi vaqt ${time}`);
// }, 5000);    

// const inquirer = require('inquirer');
// inquirer
//   .prompt([{ type: "input", name: "raqam", message: "raqam kiriting: " }])
//   .then((answer) => {
//     console.log("Men kiritgan raqam qiymati: ", answer.raqam);
//   })
//   .catch((err) => console.log(err)); 

// const validator = require("validator");
// const test = validator.isEmail('foo@bar.com');
// const raqam = validator.isInt('100'); // sonni tekshirish -  true or false ni qaytaradi.
// const checkIP = validator.isIP("114.200.35.154");
// console.log("email ni tekshirish: ", test); 
// console.log("int ni tekshirish: ", raqam);
// console.log("IP ni tekshirish: ", checkIP);  // true or false ni qaytaradi

// const { v4 : uuidv4} = require('uuid'); 
// const random = uuidv4();    
// console.log(random); // takrorlanmaydigan string hosil qiladi
// const chalk = require('chalk'); 
// const log = console.log;    
// // log(chalk.blue(" Hello ")+ random + chalk.red("  ! ! ! ")); // takrorlanmaydigan string hosil qiladi
// log(chalk.red(`uuid creates ${random}`));
