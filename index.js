// Module package File

// const calculate = require("./hisob");
// const result = calculate.kopaytirish(2,5);
// console.log(result);


// const result1 = calculate.ayirish(50,30);
// console.log(result1);


// const result2 = calculate.bolish(60,30);
// console.log(result2);


// const result3 = calculate.qoshish(70,30);
// console.log(result3);

// console.log(require('module').wrapper);

// console.log(arguments);  // bu path ning scope ko`rinishi



// console.log('=====================================================');

const Accoount = require('./account');
Accoount.TellMeAboutClass();
Accoount.TellMeTime();
const reAccount = new Accoount('Abdulatif', 20000 , 8840065241263);
reAccount.withdrawMoney(5000);
reAccount.giveTheDetail();
reAccount.makedeposit(7000);
reAccount.giveTheDetail();

