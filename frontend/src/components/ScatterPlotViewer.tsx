import { Drawer, Select, Flex, Space, Empty } from "antd"
import type { Alloy } from "../types/Alloy"
import { useMemo, useState } from "react"
import { Scatter } from "react-chartjs-2"
import { type ChartData, type ChartOptions } from "chart.js"

import {
    Chart,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ScatterController
} from "chart.js";

Chart.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ScatterController
);

interface Props {
    filteredAlloys: Alloy[],
    isOpen: boolean,
    onClose: () => void
}

interface ScatterPoint {
  x: number
  y: number
  label: string
}

const ScatterPlotDrawer = ({filteredAlloys, isOpen, onClose}: Props) => {

    const [xAxis, setXAxis] = useState<string | null>(null)
    const [yAxis, setYAxis] = useState<string | null>(null)

    const handleOnClose = () => {
        setXAxis(null)
        setYAxis(null)
        onClose()
    }

    // Element options for selectors
    const elementOptions = useMemo(() => {
        const elements = new Set<string>()
        filteredAlloys?.forEach((alloy) => {
            alloy.compositions.forEach((composition) => {
                if (composition.chemicalElementSymbol) {
                    elements.add(composition.chemicalElementSymbol)
                }
            })
        })
        return Array.from(elements).sort().map((element) => ({label: element, value: element}))
    }, [filteredAlloys])

    // Scatter options
    const scatterOptions: ChartOptions<'scatter'> = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: yAxis ? `Nominal ${yAxis}` : '',
                    font: { weight: 'bold' }
                },
                beginAtZero: true
            },
            x: {
                title: {
                    display: true,
                    text: xAxis ? `Nominal ${xAxis}` : '',
                    font: { weight: 'bold' }
                },
                beginAtZero: true
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const point = context.raw as ScatterPoint;
                        return [`Alloy: ${point.label}`, `${xAxis}: ${point.x}`, `${yAxis}: ${point.y}`]
                    }
                }
            }
        }
    }

    const scatterData: ChartData<'scatter', ScatterPoint[]> = useMemo(() => {

        if (!xAxis || !yAxis) return { datasets: [] }

        const points = filteredAlloys.map((alloy) => {
            const compX = alloy.compositions.find((composition) => composition.chemicalElementSymbol == xAxis);
            const compY = alloy.compositions.find((composition) => composition.chemicalElementSymbol == yAxis);

            const valX = compX?.nominal ?? (compX ? 0 : null);
            const valY = compY?.nominal ?? (compY ? 0 : null);

            if (valX && valY) {
                return {
                    x: valX,
                    y: valY,
                    label: String(alloy.name)
                }
            }
            return null
        }).filter((p): p is ScatterPoint => p !== null);

        return {
            datasets: [
                {
                    label: 'Scatter Plot',
                    data: points,
                    backgroundColor: '#1890ff',
                    pointRadius: 6,
                    pointHoverRadius: 9,
                }
            ]
        }
    }, [filteredAlloys, xAxis, yAxis])

    return (
        <Drawer 
            title="Scatter Plot Viewer" 
            open={isOpen} 
            onClose={handleOnClose}
            size={800}
            destroyOnHidden
        >

            <Flex vertical>

                {/* XY-Axis Selection */}
                <Flex gap='middle' justify='center'>
                    <Space>
                        X-Axis:
                        <Select 
                            placeholder='Select Element'
                            value={xAxis}
                            onChange={(value) => setXAxis(value)}
                            options={elementOptions}
                        />
                    </Space>
                    <Space>
                        Y-Axis:
                        <Select 
                            placeholder='Select Element'
                            value={yAxis}
                            onChange={(value) => setYAxis(value)}
                            options={elementOptions}
                        />
                    </Space>
                </Flex>

                {/* Scatter Plot */}
                <div style={{ height: '500px', width: '100%', marginTop: '20px', position: 'relative' }}>
                    {xAxis && yAxis && scatterData.datasets[0]?.data.length > 0 ? (
                        <Scatter data={scatterData} options={scatterOptions} />
                    ) : (
                        <div style={{ paddingTop: '100px' }}>
                        <Empty 
                            description={
                            <span>
                                Select two chemical elements to visualize the scatter plot
                                <br />
                                with the <b>{filteredAlloys.length}</b> selected alloys.
                            </span>
                            } 
                        />
                        </div>
                    )}
                </div>

            </Flex>

        </Drawer>
    )
}

export default ScatterPlotDrawer