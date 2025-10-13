import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, ChartData, ChartOptions, registerables, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  imports: [CommonModule, SidebarComponent, BaseChartDirective, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;



  isOpen = false;
  isProfileOpen = false;
  periods = ["Cette année", "Ce mois", "Cette semaine"];
  selectedPeriod = "Cette année";

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectPeriod(period: string) {
    this.selectedPeriod = period;
    this.isOpen = false;
  }

  toggleProfileMenu(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isProfileOpen = !this.isProfileOpen;
  }

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }
  }



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

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280', font: { size: 13 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#F3F4F6' },
        ticks: { color: '#9CA3AF', stepSize: 4 }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
      }
    }
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Terminés', 'Encours', 'Annulés'],
    datasets: [
      {
        data: [21, 8, 2],
        backgroundColor: ['#38AA36', '#FCD34D', '#EF4444'],
        barThickness: 100,
      }
    ]
  };

  // ---- 2️⃣ Graphe donut (Répartition Utilisateurs)
  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRound',
          padding: 15,
          font: { size: 12 },
          // Taille des puces si besoin
          boxWidth: 12,
          boxHeight: 12,
          generateLabels: (chart) => {
            const c: any = chart as any;
            const labels: any[] = c?.data?.labels ?? [];
            const ds: any = c?.data?.datasets?.[0] ?? {};
            const colors: string[] = (ds.backgroundColor as string[]) ?? [];
            const values: number[] = (ds.data as number[]) ?? [];
            return labels.map((label: any, i: number) => ({
              text: `${label} : ${values[i]}%`,
              fillStyle: colors[i],
              strokeStyle: 'transparent', // pas de bordure
              lineWidth: 0,
              pointStyle: 'rectRounded',   // applique bien la forme
              hidden: false,
              index: i
            }));

          }
        }
      }
    }
  };

  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Parents', 'Enfants', 'Chauffeurs'],
    datasets: [{
      data: [29, 54, 18],
      backgroundColor: ['#0EA5E9', '#38AA36', '#FCD34D'],
      borderWidth: 0
    }]
  };

  // ---- 3️⃣ Évolution des Revenus (Line)
  revenueLineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: (ctx) => {
            const v = ctx.parsed.y as number;
            const k = Math.round(v / 1000);
            return `${k}K FCFA`;
          }
        }
      },
      // On peut aussi définir des plugins globaux ici si nécessaire
    },
    scales: {
      x: {
        grid: { color: '#EEF2F7' },
        border: { display: false },
        ticks: { color: '#9CA3AF' }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#EEF2F7' },
        border: { display: false },
        ticks: {
          color: '#9CA3AF',
          stepSize: 25000,
          callback: (value) => `${Number(value) / 1000}K`
        }
      }
    }
  };

  revenueLineData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [90000, 70000, 95000, 120000, 100000, 85000, 100000, 130000, 110000, 100000, 125000, 150000],
        borderColor: '#3B82F6',
        backgroundColor: 'transparent',
        borderWidth: 1,
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4
      }
    ]
  };

  // Plugin pour ajouter un effet de glow/blur derrière la ligne (sans aplat en dessous)
  revenueGlowPlugin: Plugin<'line'> = {
    id: 'revenue-glow',
    afterDatasetsDraw: (chart) => {
      const meta = chart.getDatasetMeta(0);
      const ds: any = chart.data.datasets?.[0] as any;
      if (!meta || meta.hidden || !meta.dataset) return;
      const ctx = chart.ctx as CanvasRenderingContext2D;
      const color = (ds?.borderColor as string) || '#3B82F6';
      const lineEl: any = meta.dataset;

      // Sauvegarde des options d'origine
      const origWidth = lineEl.options?.borderWidth ?? 3;
      const origCap = lineEl.options?.borderCapStyle;
      const origJoin = lineEl.options?.borderJoinStyle;

      ctx.save();
      // Coups larges et flous en arrière-plan (couches superposées)
      const layers = [
        { blur: 24, width: origWidth + 10, alpha: 0.25 },
        { blur: 16, width: origWidth + 6, alpha: 0.2 },
        { blur: 10, width: origWidth + 3, alpha: 0.15 }
      ];

      lineEl.options.borderCapStyle = 'round';
      lineEl.options.borderJoinStyle = 'round';

      layers.forEach(l => {
        ctx.shadowColor = color;
        ctx.shadowBlur = l.blur;
        ctx.globalAlpha = l.alpha;
        lineEl.options.borderWidth = l.width;
        lineEl.draw(ctx);
      });

      // Restaure puis dessine la ligne nette par-dessus
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      lineEl.options.borderWidth = origWidth;
      lineEl.options.borderCapStyle = origCap;
      lineEl.options.borderJoinStyle = origJoin;
      lineEl.draw(ctx);

      ctx.restore();
    }
  };

  // ---- 4️⃣ Croissance des Abonnements (Bar)
  subsGrowthOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}K`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#6B7280' }
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: '#EEF2F7' },
        ticks: {
          color: '#9CA3AF',
          stepSize: 2,
          callback: (value) => `${value}K`
        }
      }
    }
  };

  subsGrowthData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        data: [10, 6, 5, 3, 6, 1, 4, 2],
        backgroundColor: '#38AA36',
        borderRadius: 8,
        barThickness: 5
      }
    ]
  };



}