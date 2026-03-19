const resultado = document.querySelector(".resultado");
const botoes = document.querySelectorAll("button");

let conta = "";
const operadores = ["+", "-", "×", "÷"];

function soma (a, b){
    return a + b;
}

function subtracao(a, b){
    return a - b;
}

function mulplicacao(a, b){
    return a * b;
}

function divisao(a, b){
    if (b === 0) return "Erro";
    return a / b;
}

function calcular(a, b, operadores){
    return operadores(a, b)
}


botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        let valor = botao.textContent;

        
        if (valor === "C") {
            conta = "";
            resultado.textContent = "0";
            return;
        }

       
        if (valor === "=") {
            try {
                let contaJS = conta
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/,/g, ".");

                conta = eval(contaJS).toString();
                resultado.textContent = conta;
            } catch {
                conta = "";
                resultado.textContent = "0";
            }
            return;
        }

       
        if (valor === "%") {

            if (conta === "") return;

            let partes = conta.split(/([+\-×÷])/);
            let ultimo = partes[partes.length - 1];

            if (!operadores.includes(ultimo) && ultimo !== "") {

                let numero = parseFloat(ultimo.replace(",", "."));

                if (!isNaN(numero)) {
                    numero = numero / 100;
                    partes[partes.length - 1] = numero.toString();
                    conta = partes.join("");
                    resultado.textContent = conta;
                }
            }

            return;
        }

        if (valor === "±") {

            if (conta === "") return;

            let partes = conta.split(/([+\-×÷])/);

            for (let i = partes.length - 1; i >= 0; i--) {

                if (!operadores.includes(partes[i])) {

                    if (partes[i].startsWith("-")) {
                        partes[i] = partes[i].substring(1);
                    } else {
                        partes[i] = "-" + partes[i];
                    }

                    break;
                }
            }

            conta = partes.join("");
            resultado.textContent = conta;
            return;
        }

        
        if (conta === "" && operadores.includes(valor)) {
            return;
        }

        
        let ultimo = conta.slice(-1);
        if (operadores.includes(valor) && operadores.includes(ultimo)) {
            conta = conta.slice(0, -1) + valor;
            resultado.textContent = conta;
            return;
        }

        if (conta === "0" && valor === "0") return;

        if (conta === "0" && valor !== ",") {
            conta = valor;
            resultado.textContent = conta;
            return;
        }

        if (conta.length >= 12) return;

        conta += valor;
        resultado.textContent = conta;

    });
});