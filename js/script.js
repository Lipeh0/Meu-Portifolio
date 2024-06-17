const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

/*formulario.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const listaRespostas = { 
        "nome": formulario.elements["nome"].value,
        "email": formulario.elements["email"].value,
        "assunto": formulario.elements["assunto"].value,
        "mensagem": formulario.elements["mensagem"].value,
    }
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    
    // Redireciona para outra página após o envio do formulário.  
    window.location.href = "./pages/formulario-enviado.html";
  
});
*/

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", (evento) => {
        evento.preventDefault();
        verificaCampo(campo);
    });
    // Adicionar um ouvinte de evento "input" para validação em tempo real.
    campo.addEventListener("input", () => verificaCampo(campo));
});

const tiposDeErro = [
    'valueMissing',  
    'typeMismatch',
    'tooShort',
    'patternMismatch',
    'customError',
];

const mensagens = {
    name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        patternMismatch: "Por favor, preencha um email válido.",
        typeMismatch: "Por favor, preencha um email válido."
    },
    subject: {
        valueMissing: "O campo de assunto não pode estar vazio.",
        tooShort: "O campo de assunto não tem caracteres suficientes.",
    },
    message: {
        valueMissing: 'O campo de mensagem não pode estar vazio.',
        tooShort: "O campo de assunto não tem caracteres suficientes."
    },
}

function verificaCampo(campo) {
    campo.setCustomValidity(''); 
    let mensagem = "";
    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro] || "Campo inválido.";
        }
    });

    const mensagemErro = campo.parentNode.querySelector('.mensagem__erro');

    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
