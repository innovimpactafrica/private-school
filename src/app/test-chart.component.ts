import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Enregistrer les éléments Chart.js nécessaires
Chart.register(...registerables);

@Component({
    selector: 'app-test-chart',
    standalone: true,
    imports: [BaseChartDirective],
    template: `
    <div class="p-4">
      <h2>Test ng2-charts - Compatible avec Angular 18</h2>
      <div style="width: 400px; height: 400px;">
        <canvas baseChart
          [data]="chartData"
          [type]="chartType"
          [options]="chartOptions">
        </canvas>
      </div>
    </div>
  `
})
export class TestChartComponent {
    chartType: ChartType = 'doughnut';

    chartData: ChartConfiguration['data'] = {
        labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
        datasets: [
            {
                data: [300, 500, 100],
                backgroundColor: ['#38AA36', '#EDF1F7', '#FF6384']
            }
        ]
    };

    chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };
}