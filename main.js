import { geraListaDeRetorno } from "./src/investimentGoals";

const btnCalculaMontante = document.querySelector("#calculaMontante");
const form = document.getElementsByTagName("form")[0];

function renderizaProgressaoInvestimento() {
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

  if (
    isNaN(inputValue) ||
    (inputValue <= 0 && !parentElement.classList.contains("error"))
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

for (const formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validarCampos);
  }
}

btnCalculaMontante.addEventListener("click", (evt) => {
  evt.preventDefault();
  renderizaProgressaoInvestimento();
});
