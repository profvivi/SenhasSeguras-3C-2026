// CONFIGURAÇÕES E SELEÇÃO DE ELEMENTOS DO HTML
const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12; // Define o tamanho padrão inicial da senha
numeroSenha.textContent = tamanhoSenha;

// CONJUNTOS DE CARACTERES DISPONÍVEIS PARA A SENHA
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// SELEÇÃO DOS BOTÕES, CHECKBOXES E CAMPOS DE EXIBIÇÃO
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

// CONFIGURAÇÃO DOS EVENTOS DE CLIQUE PARA OS BOTÕES DE TAMANHO
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// FUNÇÃO PARA REDUZIR O TAMANHO DA SENHA NO BOTÃO [-]
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// FUNÇÃO PARA AUMENTAR O TAMANHO DA SENHA NO BOTÃO [+]
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// MONITOR DE CLIQUES NOS CHECKBOXES PARA REGENERAR A SENHA AUTOMATICAMENTE
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// GERA UMA SENHA INICIAL ASSIM QUE A PÁGINA CARREGA
geraSenha();

// FUNÇÃO PRINCIPAL QUE CRIA E MONTA A SENHA ALEATÓRIA
function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = codebase = alfabeto + simbolos;
    }
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// FUNÇÃO QUE CALCULA A SEGURANÇA (ENTROPIA) E DEFINE A COR DA BARRA
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}

