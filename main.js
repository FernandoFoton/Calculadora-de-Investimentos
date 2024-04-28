import { geraListaDeRetorno } from "./src/investimentGoals";

const btnCalculaMontante = document.querySelector("#calculaMontante");
const btnLimpaFormulario = document.querySelector("#limpaFormulario");
const form = document.getElementsByTagName("form")[0];

function renderizaProgressaoInvestimento(evt) {
  evt.preventDefault();
  if(document.querySelector('.error')){
    return;
  }

  const inputCapital = Number(
    document.querySelector("#capital").value.replace(",", ".")
  );
  const inputCapitalAdicional = Number(
    document.querySelector("#capitalAdicional").value.replace(",", ".")
  );
  const inputPrazo = Number(document.querySelector("#prazo").value);
  const inputTipoPrazo = document.querySelector("#tipoPrazo").value;
  const inputTaxa = Number(
    document.querySelector("#taxa").value.replace(",", ".")
  );
  const inputTipoTaxa = document.querySelector("#tipoTaxa").value;

  const listaRetornos = geraListaDeRetorno(
    inputCapital,
    inputCapitalAdicional,
    inputPrazo,
    inputTipoPrazo,
    inputTaxa,
    inputTipoTaxa
  );

  console.log(listaRetornos);
}

function validarCampos(evt) {
  if (evt.target.value === "") {
    return;
  }

  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");

  if (!parentElement.classList.contains("error") &&
    (isNaN(inputValue) ||
    (inputValue <= 0) )
  ) {
    if (evt.target.getAttribute("id") === "capitalAdicional") {
      if (Number(inputValue) === 0) return;
    }
    const errorTextElement = document.createElement("p");
    errorTextElement.classList.add("text-red-500");
    errorTextElement.innerText = "Insira um valor numérico e maior do que zero";

    parentElement.classList.add("error");
    grandParentElement.appendChild(errorTextElement);
  } else if (
    parentElement.classList.contains("error") &&
    !isNaN(inputValue) &&
    Number(inputValue) > 0
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

function limparFormulario(){
  form['capital'].value = '';
  form['capitalAdicional'].value = '';
  form['prazo'].value = '';
  form['taxa'].value = '';

  const listaCamposErros = document.querySelectorAll('.error');

  for(let campoErrado of listaCamposErros){
    campoErrado.classList.remove('error');
    campoErrado.parentElement.querySelector('p').remove();
  }
}

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validarCampos);
  }
}

btnCalculaMontante.addEventListener("click",renderizaProgressaoInvestimento);
btnLimpaFormulario.addEventListener("click",limparFormulario);
