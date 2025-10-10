import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

// Enregistrer tous les composants Chart.js
Chart.register(...registerables);

interface StatCard {
  title: string;
  value: number | string;
  subtitle: string;
  icon: string;
  color: string;
  trend?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BaseChartDirective, ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('growthChart') growthChartRef!: ElementRef<HTMLCanvasElement>;

  selectedPeriod: string = 'year';

  // Variables pour stocker les instances des graphiques
  private barChart: Chart | null = null;
  private pieChart: Chart | null = null;
  private lineChart: Chart | null = null;
  private growthChart: Chart | null = null;

  statsCards: StatCard[] = [
    {
      title: 'Utilisateurs',
      value: 120,
      subtitle: 'Parents: 20 - Enfants: 100',
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Chauffeurs actifs',
      value: 15,
      subtitle: '12 écoles partenaires',
      icon: 'car',
      color: 'cyan'
    },
    {
      title: 'Trajets du jour',
      value: '1000',
      subtitle: '600 terminés - 100 annulés',
      icon: 'route',
      color: 'yellow'
    },
    {
      title: 'Revenue mensuel',
      value: '155 000 cfa',
      subtitle: '+20% ce mois',
      icon: 'money',
      color: 'green',
      trend: 'up'
    }
  ];

  secondaryStats: StatCard[] = [
    {
      title: 'Abonnements actifs',
      value: 20,
      subtitle: 'Utilisateurs abonnés',
      icon: 'subscription',
      color: 'indigo'
    },
    {
      title: 'Montant Moyen',
      value: '265,35 cfa',
      subtitle: 'Par abonnement',
      icon: 'average',
      color: 'teal'
    },
    {
      title: 'Paiement en attente',
      value: '15 000',
      subtitle: 'CFA à traiter',
      icon: 'pending',
      color: 'yellow'
    }
  ];

  ngOnInit(): void {
    // Initialisation des données si nécessaire
  }

  ngAfterViewInit(): void {
    // Créer les graphiques après que la vue soit initialisée
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  private initializeCharts(): void {
    //this.createBarChart();
    this.createPieChart();
    this.createLineChart();
    this.createGrowthChart();
  }

  consultationsBarData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    datasets: [
      { label: 'Médecine générale', data: [11, 16, 0, 18, 8], backgroundColor: '#22c55e', barPercentage: 0.9 },
      { label: 'Cardiologie', data: [9, 0, 11, 7, 0], backgroundColor: '#3498DB', barPercentage: 0.9 },
      { label: 'Radiologie', data: [6, 0, 16, 0, 12], backgroundColor: '#9B59B6', barPercentage: 0.9 },
      { label: 'Dermatologie', data: [3, 18, 0, 10, 0], backgroundColor: '#f59e42', barPercentage: 0.9 }
    ]
  };
  consultationsBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { boxWidth: 14 } } },
    scales: {
      x: { 
        stacked: true,
        border: {
          dash: [4],
          color: '#666666'
        }
       },
      y: {
        stacked: true,
         border: {
          dash: [4],
          color: '#666666'
        },
        beginAtZero: true,
        max: 36,
        ticks: {
          stepSize: 9,
          callback: function(value) { return value; }
        }
      }
    }
  };


  private createPieChart(): void {
    if (this.pieChartRef?.nativeElement) {
      const ctx = this.pieChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.pieChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Parents', 'Enfants', 'Chauffeurs'],
            datasets: [{
              data: [29, 54, 18],
              backgroundColor: ['#0EA5E9', '#38AA36', '#FCD34D'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 15,
                  font: { size: 12 },
                  generateLabels: (chart) => {
                    const data = chart.data;
                    if (data.labels && data.datasets.length) {
                      return data.labels.map((label, i) => ({
                        text: `${label} : ${data.datasets[0].data[i]}%`,
                        fillStyle: (data.datasets[0].backgroundColor as string[])[i],
                        hidden: false,
                        index: i
                      }));
                    }
                    return [];
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  private createLineChart(): void {
    if (this.lineChartRef?.nativeElement) {
      const ctx = this.lineChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [{
              data: [120, 140, 110, 160, 180, 155],
              borderColor: '#38AA36',
              backgroundColor: 'rgba(56, 170, 54, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#38AA36',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  font: { size: 12 },
                  color: '#6b7280'
                }
              },
              y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
                border: { display: false },
                ticks: {
                  font: { size: 12 },
                  color: '#6b7280',
                  callback: (value) => `${value}K`
                }
              }
            }
          }
        });
      }
    }
  }

  private createGrowthChart(): void {
    if (this.growthChartRef?.nativeElement) {
      const ctx = this.growthChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.growthChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
            datasets: [{
              data: [5, 8, 12, 15, 18, 20],
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 3,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#3B82F6',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  font: { size: 12 },
                  color: '#6b7280'
                }
              },
              y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
                border: { display: false },
                ticks: {
                  stepSize: 5,
                  font: { size: 12 },
                  color: '#6b7280'
                }
              }
            }
          }
        });
      }
    }
  }

  changePeriod(period: string): void {
    this.selectedPeriod = period;
    this.refreshCharts();
  }

  private refreshCharts(): void {
    // Détruire les anciens charts
    this.destroyCharts();

    // Recréer avec de nouvelles données selon la période
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  private destroyCharts(): void {
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.pieChart = null;
    }
    if (this.lineChart) {
      this.lineChart.destroy();
      this.lineChart = null;
    }
    if (this.growthChart) {
      this.growthChart.destroy();
      this.growthChart = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }
}