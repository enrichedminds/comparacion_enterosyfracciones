const menu = document.getElementById("menu");
const exerciseContainer = document.getElementById("exerciseContainer");
const num1Element = document.getElementById("num1");
const num2Element = document.getElementById("num2");
const operatorElement = document.getElementById("operator");
const submitButton = document.getElementById("submit");
const nextExerciseButton = document.getElementById("nextExercise");
const feedbackElement = document.getElementById("feedback");
const backButton = document.getElementById("back");

let comparisonType = ""; // "integer" o "fraction"

// Genera un número entero aleatorio
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera una fracción aleatoria
function getRandomFraction() {
    const numerator = getRandomInteger(1, 10);
    const denominator = getRandomInteger(1, 10);
    return { numerator, denominator };
}

// Genera HTML para una fracción en formato vertical
function generateFractionHTML(numerator, denominator) {
    return `<div class="fraction">
                <div>${numerator}</div>
                <hr>
                <div>${denominator}</div>
            </div>`;
}

// Genera el ejercicio según el tipo de comparación
function generateExercise() {
    if (comparisonType === "integer") {
        const num1 = getRandomInteger(-10, 10);
        const num2 = getRandomInteger(-10, 10);
        num1Element.textContent = num1;
        num2Element.textContent = num2;
        num1Element.classList.remove("fraction");
        num2Element.classList.remove("fraction");
    } else if (comparisonType === "fraction") {
        const fraction1 = getRandomFraction();
        const fraction2 = getRandomFraction();
        num1Element.innerHTML = generateFractionHTML(fraction1.numerator, fraction1.denominator);
        num2Element.innerHTML = generateFractionHTML(fraction2.numerator, fraction2.denominator);
        num1Element.dataset.value = fraction1.numerator / fraction1.denominator; // Guardar valor decimal
        num2Element.dataset.value = fraction2.numerator / fraction2.denominator; // Guardar valor decimal
        num1Element.classList.add("fraction");
        num2Element.classList.add("fraction");
    }
    feedbackElement.textContent = "";
}

// Evalúa la respuesta del usuario
function evaluateAnswer() {
    let num1, num2;

    if (comparisonType === "integer") {
        num1 = parseInt(num1Element.textContent);
        num2 = parseInt(num2Element.textContent);
    } else if (comparisonType === "fraction") {
        num1 = parseFloat(num1Element.dataset.value); // Usar valor decimal almacenado
        num2 = parseFloat(num2Element.dataset.value);
    }

    const operator = operatorElement.value;

    let isCorrect = false;

    switch (operator) {
        case "<":
            isCorrect = num1 < num2;
            break;
        case ">":
            isCorrect = num1 > num2;
            break;
        case "=":
            isCorrect = num1 === num2;
            break;
    }

    if (comparisonType === "integer") {
        feedbackElement.textContent = isCorrect
            ? `¡Correcto! ${num1} es ${operator === "<" ? "menor que" : operator === ">" ? "mayor que" : "igual a"} ${num2}`
            : `Incorrecto. ${num1} no es ${operator === "<" ? "menor que" : operator === ">" ? "mayor que" : "igual a"} ${num2}, intente otra vez.`;
        feedbackElement.style.color = isCorrect ? "green" : "red";
    } else if (comparisonType === "fraction") {
        const fraction1HTML = num1Element.innerHTML;
        const fraction2HTML = num2Element.innerHTML;

        feedbackElement.innerHTML = isCorrect
            ? `<div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <span>¡Correcto!</span>
                    <div>${fraction1HTML}</div>
                    <span>es ${operator === "<" ? "menor que" : operator === ">" ? "mayor que" : "igual a"}</span>
                    <div>${fraction2HTML}</div>
               </div>`
            : `<div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <div>${fraction1HTML}</div>
                    <span>no es ${operator === "<" ? "menor que" : operator === ">" ? "mayor que" : "igual a"}</span>
                    <div>${fraction2HTML}</div>
               </div>
               <div style="text-align: center;">, Intente otra vez.</div>`;
        feedbackElement.style.color = isCorrect ? "green" : "red";
    }

    // Si es correcto, esperar 2 segundos y pasar al siguiente ejercicio
    if (isCorrect) {
        setTimeout(generateExercise, 2000); // 2 segundos de espera
    }
}

// Maneja los eventos del menú principal y ejercicios
menu.addEventListener("click", (e) => {
    if (e.target.id === "compareIntegers" || e.target.id === "compareFractions") {
        comparisonType = e.target.id === "compareIntegers" ? "integer" : "fraction";
        menu.classList.add("hidden");
        exerciseContainer.classList.remove("hidden");
        generateExercise();
    }
});

submitButton.addEventListener("click", evaluateAnswer);
nextExerciseButton.addEventListener("click", generateExercise);
backButton.addEventListener("click", () => {
    menu.classList.remove("hidden");
    exerciseContainer.classList.add("hidden");
    feedbackElement.textContent = "";
});