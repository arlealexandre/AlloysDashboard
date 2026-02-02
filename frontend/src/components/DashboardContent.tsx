import { useCallback, useEffect, useState } from 'react';
import { Layout, Table, Typography, Descriptions, Divider, Tag, Empty } from 'antd';
import type { Alloy } from '../types/Alloy';
const { Content, Sider } = Layout;
const { Title, Text } = Typography;

// Les colonnes restent les mêmes
const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Product Type', dataIndex: ['properties', 'productType'], key: 'productType' },
    { title: 'Product Shape', dataIndex: ['properties', 'productShape'], key: 'productShape' },
    { title: 'Product Thickness', dataIndex: ['properties', 'productThickness'], key: 'productThickness' }
];

const DashboardContent = () => {
    const [alloys, setAlloys] = useState<Alloy[]>([]);
    const [loading, setLoading] = useState(false);
    const [hoveredRecord, setHoveredRecord] = useState<Alloy | null>(null);

    const fetchAlloys = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5290/api/alloys?page=1&pageSize=50');
            const data = await response.json();
            
            const formattedData = data.alloys.map((a: any, index: number) => ({
                ...a,
                key: a.id || index
            }));

            setAlloys(formattedData);
        } catch (err) {
            console.error("Erreur fetching alloys", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAlloys();
    }, [fetchAlloys]);

    return (
        <Content style={{ padding: '20px' }}>

            <Layout style={{ gap: '20px' }}>

                {/* Alloys Table */}
                <Content>
                    <Table
                        loading={loading}
                        rowSelection={{ type: 'checkbox' }}
                        columns={columns}
                        dataSource={alloys}
                        onRow={(record: Alloy) => ({
                            onMouseEnter: () => setHoveredRecord(record),
                        })}
                    />
                </Content>

                {/* Alloy Properties Drawer */}
                <Sider 
                    style={{ 
                        height: 400,
                        padding: '20px', 
                        borderRadius: '8px',
                        overflowY: 'auto',
                        background: '#ffffff'
                    }}
                >
                    {hoveredRecord ? (
                        <div>
                            <Title level={4} style={{margin: 0}}>
                                Alloy {hoveredRecord.name}
                            </Title>
                            
                            <Divider />

                            <Descriptions title="Physical Properties" column={1} size="small" labelStyle={{ color: '#888' }} contentStyle={{ color: '#fff' }}>
                                <Descriptions.Item label="Type">{hoveredRecord.properties.productType}</Descriptions.Item>
                                <Descriptions.Item label="Shape">{hoveredRecord.properties.productShape}</Descriptions.Item>
                                <Descriptions.Item label="Thickness">{hoveredRecord.properties.productThickness} mm</Descriptions.Item>
                                <Descriptions.Item label="Aging Temp">{hoveredRecord.properties.agingStep1Temp}°C</Descriptions.Item>
                                <Descriptions.Item label="Aging Time">{hoveredRecord.properties.agingStep1Time}h</Descriptions.Item>
                                <Descriptions.Item label="TYS (L-Dir)">{hoveredRecord.properties.lDirectionTys}</Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            <Title level={5} style={{ color: '#fff', fontSize: '14px', marginBottom: '12px' }}>
                                Chemical Composition
                            </Title>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {hoveredRecord.compositions.map((comp) => (
                                    <Tag color="blue" key={comp.chemicalElementSymbol} style={{ margin: 0 }}>
                                        <Text strong>{comp.chemicalElementSymbol}</Text>: {comp.nominal}%
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '40px 0' }}>
                            <Empty description={<Text type="secondary">Survolez un alliage pour voir les détails complets</Text>} />
                        </div>
                    )}
                </Sider>

            </Layout>
        </Content>
    );
};

export default DashboardContent;