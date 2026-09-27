const cor = (variavel) => getComputedStyle(document.documentElement).getPropertyValue(variavel).trim();

export async function criarGraficoRecursos(canvas, dados) {
  try {
    const { Chart, DoughnutController, ArcElement, Tooltip, Legend } = await import('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/+esm');
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    if (!canvas.isConnected) return null;
    return new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: dados.map((d) => d.destino),
        datasets: [{
          data: dados.map((d) => d.percentual),
          backgroundColor: [cor('--cor-primaria'), cor('--cor-secundaria'), cor('--cor-destaque')],
          borderColor: cor('--cor-fundo'),
          borderWidth: 2,
        }],
      },
      options: {
        plugins: {
          legend: { position: 'bottom', labels: { color: cor('--cor-texto') } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` } },
        },
      },
    });
  } catch {
    canvas.closest('.grafico')?.remove();
    return null;
  }
}
