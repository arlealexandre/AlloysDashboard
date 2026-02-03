import { useState, useMemo } from 'react';
import { Drawer, Select, Space, Typography, Empty } from 'antd';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
  type ChartData
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import type { Alloy } from "../types/Alloy";

// Enregistrement des modules nécessaires pour Chart.js
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  alloys: Alloy[];
}

// Interface pour sécuriser le typage des points du graphique
interface ScatterPoint {
  x: number;
  y: number;
  label: string;
}

const XYSelectionDrawer = ({ open, onClose, alloys }: Props) => {
  const [xAxis, setXAxis] = useState<string | undefined>(undefined);
  const [yAxis, setYAxis] = useState<string | undefined>(undefined);

  // 1. Extraire les éléments chimiques uniques pour les Selects
  const elementOptions = useMemo(() => {
    const elements = new Set<string>();
    alloys.forEach(alloy => {
      alloy.compositions?.forEach(comp => {
        if (comp.chemicalElementSymbol) {
          elements.add(comp.chemicalElementSymbol);
        }
      });
    });
    return Array.from(elements)
      .sort()
      .map(el => ({ label: el, value: el }));
  }, [alloys]);

  // 2. Transformer les données des alliages en points (x, y)
  const chartData: ChartData<'scatter', ScatterPoint[]> = useMemo(() => {
    if (!xAxis || !yAxis) return { datasets: [] };

    const points = alloys
    .map((alloy): ScatterPoint | null => {
        const compX = alloy.compositions?.find(c => c.chemicalElementSymbol === xAxis);
        const compY = alloy.compositions?.find(c => c.chemicalElementSymbol === yAxis);

        // Si l'élément n'est pas trouvé, on considère sa valeur nominale à 0% 
        // au lieu d'exclure l'alliage
        const valX = compX?.nominal ?? (compX ? 0 : null);
        const valY = compY?.nominal ?? (compY ? 0 : null);

        // On n'affiche que si l'alliage possède AU MOINS l'un des deux éléments 
        // (ou modifie selon ton besoin métier)
        if (compX || compY) {
        return {
            x: compX?.nominal ?? 0, 
            y: compY?.nominal ?? 0,
            label: String(alloy.name)
        };
        }
        return null;
    })
    .filter((p): p is ScatterPoint => p !== null);

    return {
      datasets: [
        {
          label: `${xAxis} vs ${yAxis}`,
          data: points,
          backgroundColor: '#1890ff',
          pointRadius: 6,
          pointHoverRadius: 9,
        },
      ],
    };
  }, [alloys, xAxis, yAxis]);

  // 3. Configuration des options du graphique
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxis ? `Nominal Content ${xAxis} (%)` : '',
          font: { weight: 'bold' }
        },
        grid: { color: '#f0f0f0' }
      },
      y: {
        title: {
          display: true,
          text: yAxis ? `Nominal Content ${yAxis} (%)` : '',
          font: { weight: 'bold' }
        },
        grid: { color: '#f0f0f0' }
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          // Personnalisation du tooltip pour afficher le nom de l'alliage
          label: (context) => {
            const point = context.raw as ScatterPoint;
            return [
              `Alloy: ${point.label}`,
              `${xAxis}: ${point.x}%`,
              `${yAxis}: ${point.y}%`
            ];
          }
        }
      }
    }
  };

  return (
    <Drawer 
      title="Chemical Correlation Analysis" 
      open={open} 
      onClose={onClose} 
      width={750}
      destroyOnClose // Réinitialise le composant à la fermeture
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        
        {/* Barre de sélection des axes */}
        <Space size="large" style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', width: '100%', justifyContent: 'center' }}>
          <div>
            <Text type="secondary" style={{ marginRight: 8 }}>X-Axis:</Text>
            <Select 
              placeholder="Select Element" 
              options={elementOptions} 
              style={{ width: 160 }} 
              onChange={setXAxis}
              showSearch
              value={xAxis}
            />
          </div>
          <Text strong style={{ fontSize: '18px' }}>VS</Text>
          <div>
            <Text type="secondary" style={{ marginRight: 8 }}>Y-Axis:</Text>
            <Select 
              placeholder="Select Element" 
              options={elementOptions} 
              style={{ width: 160 }} 
              onChange={setYAxis} 
              showSearch
              value={yAxis}
            />
          </div>
        </Space>

        {/* Zone du graphique */}
        <div style={{ height: '500px', width: '100%', marginTop: '20px', position: 'relative' }}>
          {xAxis && yAxis && chartData.datasets[0]?.data.length > 0 ? (
            <Scatter data={chartData} options={options} />
          ) : (
            <div style={{ paddingTop: '100px' }}>
              <Empty 
                description={
                  <span>
                    Select two chemical elements to visualize the correlation 
                    <br />
                    among the <b>{alloys.length}</b> selected alloys.
                  </span>
                } 
              />
            </div>
          )}
        </div>

      </Space>
    </Drawer>
  );
};

export default XYSelectionDrawer;