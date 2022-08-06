document.addEventListener("DOMContentLoaded", function () {
  const medStartDateField = document.querySelector("#start");
  const medEndDateField = document.querySelector("#end");
  const halfLifeField = document.querySelector("#halflife");
  const doseField = document.querySelector("#dose");
  const submitButton = document.querySelector("#submit-button");

  const graphOptions = {
    keypad: false,
    expressions: false,
    settingsMenu: false,
  };

  // initialize graph
  var elt = document.querySelector("#graph");
  var graph = Desmos.GraphingCalculator(elt, graphOptions);

  // ensure med end date is after med start date
  medStartDateField.addEventListener("input", (e) => {
    if (!e.target.value) medEndDateField.removeAttribute("min");

    medEndDateField.setAttribute("min", medStartDateField.value);
  });

  // wait for user to submit before doing calculations
  submitButton.onclick = (e) => {
    e.preventDefault();

    // input validation
    if (
      !medStartDateField ||
      !medEndDateField.value ||
      !doseField.value ||
      !halfLifeField.value
    ) {
      return alert("Make sure the form values are correct before submitting!");
    }

    // get date values and use to calculate time on/off meds
    const medStartDate = new Date(medStartDateField.value);
    const medEndDate = new Date(medEndDateField.value);
    const currentDate = new Date();

    const timeWithoutMedication = currentDate.getTime() - medEndDate.getTime();
    const timeOnMedication = medEndDate.getTime() - medStartDate.getTime();

    function millisecondsToDays(milliseconds) {
      return Math.trunc(milliseconds / (1000 * 60 * 60 * 24));
    }

    const daysWithoutMedication = millisecondsToDays(timeWithoutMedication);
    const daysOnMedication = millisecondsToDays(timeOnMedication);

    // calculate accumulated dose
    const dose = parseInt(doseField.value);
    const halfLife = parseInt(halfLifeField.value);
    const accumulatedAmount = calculateAccumulatedDose(
      dose,
      halfLife,
      daysOnMedication
    );

    function calculateAccumulatedDose(dose, halfLife, daysOnMedication) {
      let accumulatedDose = 0;
      let pastDose = dose;
      let daysElapsed = 0;

      while (pastDose > 0.001 * dose && daysElapsed <= daysOnMedication) {
        pastDose = dose * Math.pow(0.5, daysElapsed / halfLife);

        accumulatedDose += pastDose;
        daysElapsed++;
      }

      return Math.trunc(accumulatedDose);
    }

    // use variables calculated above to create equations for graph
    const taperEquation = `y=${accumulatedAmount}(.5)^{x/${halfLife}}`;
    const currentDayEquation = `x=${daysWithoutMedication}`;
    const pointOfIntersection = `A=(${daysWithoutMedication},${
      accumulatedAmount * Math.pow(0.5, daysWithoutMedication / halfLife)
    })`;

    // graph equations
    graph.setExpression({
      id: "graph1",
      latex: taperEquation,
      color: Desmos.Colors.RED,
    });
    graph.setExpression({
      id: "graph2",
      latex: currentDayEquation,
      color: Desmos.Colors.GREEN,
      lineStyle: Desmos.Styles.DASHED,
    });
    graph.setExpression({
      id: "pointA",
      latex: pointOfIntersection,
    });

    // set bounds of graph window
    graph.focusFirstExpression();
    graph.setMathBounds({
      left: halfLife * -2,
      right: Math.max(
        halfLife * 7,
        daysWithoutMedication + daysWithoutMedication * 0.5
      ),
      bottom: dose * -0.5,
      top: calculateAccumulatedDose(dose, halfLife, daysOnMedication) + dose,
    });
  };
});
