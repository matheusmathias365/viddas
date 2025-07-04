document.addEventListener('DOMContentLoaded', function() {
    const responses = JSON.parse(localStorage.getItem('surveyResponses')) || [];
    const dashboardView = document.getElementById('dashboard-view');
    const responsesView = document.getElementById('responses-view');
    const showDashboardBtn = document.getElementById('show-dashboard');
    const showResponsesBtn = document.getElementById('show-responses');

    // Navegação
    showDashboardBtn.addEventListener('click', () => {
        dashboardView.style.display = 'block';
        responsesView.style.display = 'none';
        showDashboardBtn.classList.add('active');
        showResponsesBtn.classList.remove('active');
    });

    showResponsesBtn.addEventListener('click', () => {
        dashboardView.style.display = 'none';
        responsesView.style.display = 'block';
        showDashboardBtn.classList.remove('active');
        showResponsesBtn.classList.add('active');
    });

    if (responses.length === 0) {
        document.querySelector('main').innerHTML = '<p>Nenhuma resposta ainda.</p>';
        return;
    }

    // --- Processamento de Dados ---
    const getAverage = (arr) => arr.reduce((acc, c) => acc + parseFloat(c), 0) / arr.length;
    const allScores = responses.flatMap(r => [r.scheduling, r.waitingTime, r.cleanliness, r.careQuality, r.overallSatisfaction]);
    const overallAverage = getAverage(allScores);

    // --- Resumo com IA ---
    const generateAISummary = () => {
        // ... (lógica do resumo de IA - pode ser a mesma de antes ou mais elaborada)
        return 'Análise geral dos dados...'; // Placeholder
    };

    // --- Renderização do Dashboard ---
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = `
        <div class="card kpi-card">
            <div class="card-title">Total de Respostas</div>
            <div class="kpi-value">${responses.length}</div>
        </div>
        <div class="card kpi-card">
            <div class="card-title">Média Geral de Satisfação</div>
            <div class="kpi-value">${overallAverage.toFixed(1)}</div>
        </div>
        <div class="card full-width-card">
            <div class="card-title">Resumo com Inteligência Artificial</div>
            <p>${generateAISummary()}</p>
        </div>
        <div class="card"><div class="card-title">Facilidade de Agendamento</div><canvas id="scheduling-chart"></canvas></div>
        <div class="card"><div class="card-title">Tempo de Espera</div><canvas id="waiting-time-chart"></canvas></div>
        <div class="card"><div class="card-title">Limpeza e Organização</div><canvas id="cleanliness-chart"></canvas></div>
        <div class="card"><div class="card-title">Qualidade do Atendimento</div><canvas id="care-quality-chart"></canvas></div>
        <div class="card"><div class="card-title">Satisfação Geral</div><canvas id="overall-satisfaction-chart"></canvas></div>
    `;

    // --- Renderização dos Gráficos ---
    const createChart = (canvasId, data) => {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const counts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };
        responses.forEach(res => counts[res[data]]++);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: 'Votos',
                    data: Object.values(counts),
                    backgroundColor: '#3D2516',
                    borderColor: '#CB931F',
                    borderWidth: 2
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    };

    createChart('scheduling-chart', 'scheduling');
    createChart('waiting-time-chart', 'waitingTime');
    createChart('cleanliness-chart', 'cleanliness');
    createChart('care-quality-chart', 'careQuality');
    createChart('overall-satisfaction-chart', 'overallSatisfaction');

    // --- Renderização das Respostas Individuais ---
    const reportContainer = document.getElementById('report-container');
    responses.forEach(response => {
        const card = document.createElement('div');
        card.className = 'report-card';
        card.innerHTML = `
            <h3>Resposta de ${new Date(response.timestamp).toLocaleString()}</h3>
            <p><strong>Agendamento:</strong> ${response.scheduling}</p>
            <p><strong>Tempo de Espera:</strong> ${response.waitingTime}</p>
            <p><strong>Limpeza:</strong> ${response.cleanliness}</p>
            <p><strong>Qualidade do Atendimento:</strong> ${response.careQuality}</p>
            <p><strong>Satisfação Geral:</strong> ${response.overallSatisfaction}</p>
            <p><strong>Sugestões:</strong> ${response.suggestions || 'Nenhuma'}</p>
        `;
        reportContainer.appendChild(card);
    });
});