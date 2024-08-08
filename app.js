let NumeroSecreto = 0;
let intentos = 0;
let Lista_sorteados = [];  //array
let Num_max = 10;  //Numero por el que se va a multiplicar al genera el num secreto

function Asignar_texto(elemento, texto) {   //Asigan texto a un elemento HTML
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function generar_num_secreto() {
    let secreto = Math.floor(Math.random() * Num_max) + 1;
    console.log(secreto);
    console.log(Lista_sorteados);
    //if para saber si ya sortearon todos los numeros posibles 
    if (Lista_sorteados.length == Num_max) {
        Asignar_texto('p',"Ya se sortearon todos los numeros posibles")
    }
    else {
        //if para saber si el numero generado ya aparecio en el juego 
        if (Lista_sorteados.includes(secreto)) {
            return generar_num_secreto();   // Recursividad (vuelve a llamar a la funcion)(reinicia)
        }
        else {
            Lista_sorteados.push(secreto);    //Agrega el numero al array y luego lo manda 
            return secreto;
        }
    }
}

function Condiciones_iniciales() {
    Asignar_texto('h1', 'Juego del numero secreto');
    Asignar_texto('p', `Indica un numero del 1 al ${Num_max}`)
    NumeroSecreto = generar_num_secreto();
    intentos = 1;
}
Condiciones_iniciales();

function intentoDeUsuario() {
    let num_usuario = parseInt(document.getElementById('valorUsuario').value); //Obtener un elemento por su id
    console.log(intentos + " intento");

    if (num_usuario === NumeroSecreto) {
        Asignar_texto('p', `Acertaste en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`); //If acortado
        document.getElementById('reiniciar').removeAttribute('disabled')  //Con "remove" podemos remover o quitar cosas, en este caso un atributo, el cual es disabled
    }
    else {
        //El usuario no acerto 
        if (num_usuario > NumeroSecreto) {
            Asignar_texto('p','El numero secreto es menor');
        }
        else {
            Asignar_texto('p','El numero secreto es mayor');
        }
    }
    intentos++;
    limpiar();
    return;
}

function limpiar() {
    document.querySelector('#valorUsuario').value = '';  
}
    
function reinicio_juego() {
    limpiar();
    Condiciones_iniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');  //desabilita el boton "nuevo juego" cada que reinicia, dice que disabled es verdadero, que si se desabilite
}