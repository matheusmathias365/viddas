document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        scheduling: document.querySelector('input[name="scheduling"]:checked').value,
        waitingTime: document.querySelector('input[name="waiting-time"]:checked').value,
        cleanliness: document.querySelector('input[name="cleanliness"]:checked').value,
        careQuality: document.querySelector('input[name="care-quality"]:checked').value,
        overallSatisfaction: document.querySelector('input[name="overall-satisfaction"]:checked').value,
        suggestions: this.suggestions.value,
        timestamp: new Date().toISOString()
    };

    // Salva no localStorage
    const responses = JSON.parse(localStorage.getItem('surveyResponses')) || [];
    responses.push(formData);
    localStorage.setItem('surveyResponses', JSON.stringify(responses));

    alert('Obrigado por sua avaliação!');
    this.reset();
});