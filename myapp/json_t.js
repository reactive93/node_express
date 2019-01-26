
const jsonwebToken = require("jsonwebtoken");

const fs = require("readline");

user = {
    login:"5",
    password:"5"
};


var token = jsonwebToken.sign(user,"secret",{expiresIn:"600000"});
console.log(token);

var verify = jsonwebToken.verify(token,"secret");
console.log(verify);

const console1 = fs.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

console1.question("tik tak motherfucka",answer => {
   if (answer ==="y"){

       var verify = jsonwebToken.verify(token,"secret",function (err, res) {
           if(err){
               console.log(err);
           }
           else
           {
               console.log(res);
               console.log(res.exp<Date.now()?"less":"above");
               console.log(Date.now())
           }
       });
       console.log(verify);
   }

});