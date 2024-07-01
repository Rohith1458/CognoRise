document.getElementById('bmiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);
    var weightUnit = document.getElementById('weightUnit').value;
    var heightUnit = document.getElementById('heightUnit').value;

    // Convert weight to kilograms
    if (weightUnit === 'lbs') {
        weight = weight * 0.453592;
    } else if (weightUnit === 'grams') {
        weight = weight / 1000;
    }

    // Convert height to meters
    if (heightUnit === 'inches') {
        height = height * 0.0254;
    } else if (heightUnit === 'cm') {
        height = height / 100;
    }

    var bmi = weight / (height * height);

    var resultDiv = document.getElementById('result');

    var bmiCategory = '';
    if (bmi < 18.5) {
        bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        bmiCategory = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        bmiCategory = 'Overweight';
    } else {
        bmiCategory = 'Obese';
    }

    resultDiv.innerHTML = '<h3>Your BMI: ' + bmi.toFixed(2) + '</h3><p>You are ' + bmiCategory + '</p>';
});
