import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import styled from 'styled-components';
import {theme} from '../../styles/theme';

interface DataPoint {
    name: string;
    value?: number;

    [key: string]: any;
}

interface DataChartProps {
    data: DataPoint[];
    type: 'line' | 'bar' | 'pie';
    title: string;
    dataKeys: string[];
    colors?: string[];
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: ${props => props.theme.spacing.lg} 0;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 350px;
    margin: ${props => props.theme.spacing.md} 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 300px;
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const ChartTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.3rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const DataChart: React.FC<DataChartProps> = ({
                                                 data,
                                                 type,
                                                 title,
                                                 dataKeys,
                                                 colors = [theme.colors.chart.base, theme.colors.chart.accent1, theme.colors.chart.accent2, theme.colors.chart.accent3]
                                             }) => {
    // Generate chart component based on type
    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.chart.grid}/>
                        <XAxis
                            dataKey="name"
                            stroke={theme.colors.text.secondary}
                            tick={{fontSize: window.innerWidth <= 576 ? 10 : 12}}
                        />
                        <YAxis
                            stroke={theme.colors.text.secondary}
                            tick={{fontSize: window.innerWidth <= 576 ? 10 : 12}}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.colors.background.secondary,
                                borderColor: theme.colors.background.tertiary,
                                color: theme.colors.text.primary,
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                        {dataKeys.map((key, index) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                activeDot={{r: window.innerWidth <= 576 ? 6 : 8}}
                            />
                        ))}
                    </LineChart>
                );

            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.chart.grid}/>
                        <XAxis
                            dataKey="name"
                            stroke={theme.colors.text.secondary}
                            tick={{fontSize: window.innerWidth <= 576 ? 10 : 12}}
                        />
                        <YAxis
                            stroke={theme.colors.text.secondary}
                            tick={{fontSize: window.innerWidth <= 576 ? 10 : 12}}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.colors.background.secondary,
                                borderColor: theme.colors.background.tertiary,
                                color: theme.colors.text.primary,
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                        {dataKeys.map((key, index) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </BarChart>
                );

            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={dataKeys[0]}
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={window.innerWidth <= 576 ? 80 : 120}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: theme.colors.background.secondary,
                                borderColor: theme.colors.background.tertiary,
                                color: theme.colors.text.primary,
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: window.innerWidth <= 576 ? '0.8rem' : '0.9rem'
                            }}
                        />
                    </PieChart>
                );

            default:
                return <div>Invalid chart type</div>;
        }
    };

    return (
        <ChartContainer>
            <ChartTitle>{title}</ChartTitle>
            <ResponsiveContainer width="100%" height="90%">
                {renderChart()}
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default DataChart;
