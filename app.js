let listaNumerosSorteados = [];
let limiteLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto)
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o Número Secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O Número Secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O Número Secreto é maior')
    }
    tentativas++;
    limparCampo();
}
}

function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1);
    let numeroAleatorioGerado = parseInt(Math.random() * limiteLista + 1);
    let elementosLista = listaNumerosSorteados.length;

    if (elementosLista == limiteLista) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroAleatorioGerado)) {
        return gerarNumeroAleatorio();  //RECURSION, função chama a si mesma até que a condição seja atendida.
    } else {
        listaNumerosSorteados.push(numeroAleatorioGerado);
        console.log(listaNumerosSorteados);
        return numeroAleatorioGerado;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}