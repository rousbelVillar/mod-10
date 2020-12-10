const express = require('express')
const cors = require('cors')
const app = express()


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port ,()=>{
    console.log("listening to port:" + port)
});

app.use(cors());

app.get('/practica-9/modulo10/ingreseCedula/:cedula', (req, res) => {
    const cedulaRes = {cedula: req.params.cedula,mensaje:showAnswer(req.params.cedula)}
  res.status(200).send(cedulaRes)
})

function getIsCedulaValid(cedula){
    const Adasd = 0;
    const cedulaArray = Array.from(cedula).map(Number);
    let total = 0;
    let i;
    for(i = 0; i < cedulaArray.length; i++){
        if(i  % 2){
            cedulaArray[i] = cedulaArray[i] * 2;
            cedulaArray[i] = cedulaArray[i] > 9 ? getElementSum(cedulaArray[i]) : cedulaArray[i];
         }
    }
    cedulaArray.forEach(digit=>{
        total = total + digit;
    });
    return +total.toString().split('').pop() === 0 ?  true : false;
}

function getElementSum(cedulaDigit){
    const sumOfDigits = Array.from(cedulaDigit.toString()).map(Number);
    return sumOfDigits[0] + sumOfDigits[1];
}

function showAnswer(cedula){
    const correctLength = cedula.length === 11 && cedula != 0000000000;
    const isCedulaValid = getIsCedulaValid(cedula);
    const confirmationMessage = isCedulaValid ? 'correcta' : 'incorrecta';
    const responseMessage = correctLength ?  'Su cedula: ' + cedula + ' es '  + confirmationMessage: 
                                             'La cedula debe contener 11 digitos y no puede tener solo ceros';
    return responseMessage;
}