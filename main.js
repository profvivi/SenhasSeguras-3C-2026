// Seleciona o elemento que exibe o valor do tamanho da senha na tela
const numeroSenha = document.querySelector('.parametro-senha__texto');

// Define o tamanho inicial padrão da senha
let tamanhoSenha = 12;

// Atualiza o texto da tela com o tamanho inicial da senha (12)
numeroSenha.textContent = tamanhoSenha;

// Definição dos conjuntos de caracteres disponíveis para a geração da senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

// Seleciona os botões de aumentar e diminuir o tamanho da senha
const botoes = document.querySelectorAll('.parametro-senha__botao');

// Seleciona o campo de texto (input) onde a senha gerada será exibida
const campoSenha = document.querySelector('#campo-senha');

// Seleciona todas as caixas de seleção (opções de tipo de caractere)
const checkbox = document.querySelectorAll('.checkbox');

// Seleciona o elemento que exibe visualmente a força/segurança da senha
const forcaSenha = document.querySelector('.forca');

// Atribui as funções de clique para os botões de controle de tamanho
botoes[0].onclick = diminuiTamanho; // Primeiro botão diminui
botoes[1].onclick = aumentaTamanho; // Segundo botão aumenta

// Função que reduz o tamanho da senha, limitando o mínimo em 1
function diminuiTamanho() {
if (tamanhoSenha > 1) {

tamanhoSenha--; // Reduz o tamanho em 1
}
numeroSenha.textContent = tamanhoSenha; // Atualiza o número na tela
geraSenha(); // Gera uma nova senha com o novo tamanho
}

// Função que aumenta o tamanho da senha, limitando o máximo em 20
function aumentaTamanho() {
if (tamanhoSenha < 20) {
tamanhoSenha++; // Incrementa o tamanho em 1
}
numeroSenha.textContent = tamanhoSenha; // Atualiza o número na tela
geraSenha(); // Gera uma nova senha com o novo tamanho
}

// Adiciona um evento de clique para cada checkbox para regenerar a senha ao mudar as opções
for (let i = 0; i < checkbox.length; i++) {
checkbox[i].onclick = geraSenha;
}

// Executa a função pela primeira vez para já iniciar a página com uma senha pronta
geraSenha();

// Função principal que monta o conjunto de caracteres e gera a senha aleatória
function geraSenha() {
let alfabeto = ''; // Armazena todos os caracteres permitidos escolhidos pelo usuário

// Verifica quais checkboxes estão marcadas e junta os caracteres correspondentes
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
alfabeto = alfabeto + simbolos;
}

let senha = ''; // Armazena a senha final sendo construída

// Laço que escolhe caracteres aleatórios do 'alfabeto' até atingir o tamanho desejado
for (let i = 0; i < tamanhoSenha; i++) {
let numeroAleatorio = Math.random() * alfabeto.length; // Gera número decimal entre 0 e o tamanho do alfabeto
numeroAleatorio = Math.floor(numeroAleatorio); // Arredonda o número para baixo para virar um índice válido
senha = senha + alfabeto[numeroAleatorio]; // Adiciona o caractere sorteado à senha
}

campoSenha.value = senha; // Exibe a senha final no campo de texto da tela
classificaSenha(alfabeto.length); // Chama a função para avaliar a segurança da senha
}

// Função que calcula a entropia e define visualmente se a senha é fraca, média ou forte
function classificaSenha(tamanhoAlfabeto) {
// Fórmula matemática de entropia para medir a segurança real da senha
let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
console.log(entropia); // Exibe o valor do cálculo no console do navegador

// Limpa as classes de estilo anteriores do elemento de força antes de aplicar a nova
forcaSenha.classList.remove('fraca', 'media', 'forte');
}
