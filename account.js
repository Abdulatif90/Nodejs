const moment = require('moment');

class Accoount {
    #account_id;
    #amount;
    constructor(name, amount, account_id){
        this.#account_id = account_id;
        this.#amount = amount;
        this.name = name;
    }
    tellMeBalance() {
        console.log(`Sizning balansingda ${this.#amount} $ mavjud`);
        return this.#amount;
    }

    withdrawMoney(amount){ 
        if(this.#amount > amount ) {
            this.#amount-=amount;
            console.log('Sizning hisobingizda qoldiq mablag\` :' , this.#amount,'$');
        } else {
            console.log('Sizning hisobingizda yetarlicha mablag\' mavjud emas')
        }
    }

    makedeposit(amount) {
        this.#amount+=amount;
        console.log( `Sizning hisobingizda  hozirda ${this.#amount} $ mavjud`) ;
    }

    giveTheDetail(){
        console.log(`Hurmatli ${this.name} sizning quyidagi ${this.#account_id} - hisob raqamingizda ${this.#amount} $ mavjud`);
    }
    static TellMeAboutClass(){
        console.log('Bu class accountlarni yasash uchun hizmat qiladi');
    }

    static TellMeTime(){
        console.log(`Hozirgi vaqt ${moment().format('YYYY - MM - DD HH:mm:ss' )}`);
    }
}

module.exports = Accoount;