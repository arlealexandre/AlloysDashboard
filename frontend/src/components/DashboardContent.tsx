import { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Layout, Table, Tag, type TableColumnsType } from 'antd';
import type { Alloy } from '../types/Alloy';
import type { Composition } from '../types/Composition';
import type { TableRowSelection } from 'antd/es/table/interface';

import XYSelectionDrawer from './XYSelectionDrawer';
const { Content } = Layout;

interface Props {
    refreshTrigger: number
    externalLoading: boolean
    handleFetchFailure: (message: string) => void
}

/* Table columns definition */
const columns: TableColumnsType<Alloy> = [
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'start' },
    { title: 'Product Type', dataIndex: ['properties', 'productType'], key: 'productType', fixed: 'start' },
    { title: 'Product Shape', dataIndex: ['properties', 'productShape'], key: 'productShape', fixed: 'start' },
    { title: 'Composition', dataIndex: 'compositions', key: 'compositions', width: 500, fixed: 'start',
        render: (_: any, { compositions }: any) => (
        <Flex wrap gap="small" align="center">
            {compositions.map((composition: Composition) => {
            
            var compositionLabel = ''
            if (composition.nominal != null) {
                if (composition.min != null && composition.max != null) {
                    compositionLabel = `${composition.chemicalElementSymbol}: (${composition.min} <=) ${composition.nominal} (<= ${composition.max})`
                } else if (composition.min != null && composition.max == null) {
                    compositionLabel = `${composition.chemicalElementSymbol}: (${composition.min} <=) ${composition.nominal}`
                } else if (composition.min == null && composition.max != null) {
                    compositionLabel = `${composition.chemicalElementSymbol}: ${composition.nominal} (<= ${composition.max})`
                } else {
                    compositionLabel = `${composition.chemicalElementSymbol}: ${composition.nominal}`
                }
            }

            return (
                <Tag key={composition.chemicalElementSymbol}>
                    {compositionLabel}    
                </Tag>
            );
            })}
        </Flex>
        ) 
    },
    { title: 'Product Thickness', dataIndex: ['properties', 'productThickness'], key: 'productThickness' },
    { title: 'L Direction Tys', dataIndex: ['properties', 'lDirectionTys'], key: 'lDirectionTys' },
    { title: 'Aging Step 1 Temp', dataIndex: ['properties', 'agingStep1Temp'], key: 'agingStep1Temp' },
    { title: 'Aging Step 1 Time', dataIndex: ['properties', 'agingStep1Time'], key: 'agingStep1Time' },
    { title: 'Homo Step 1 Temp', dataIndex: ['properties', 'homoStep1Temp'], key: 'homoStep1Temp' },
    { title: 'Homo Step 1 Time', dataIndex: ['properties', 'homoStep1Time'], key: 'homoStep1Time' },
    { title: 'Hot Process Step 1 T In', dataIndex: ['properties', 'hotProcessStep1TIn'], key: 'hotProcessStep1TIn' },
    { title: 'Casting Technology', dataIndex: ['properties', 'castingTechnology'], key: 'castingTechnology' }
];

const DashboardContent = ({refreshTrigger, externalLoading, handleFetchFailure}: Props) => {

    const [alloys, setAlloys] = useState<Alloy[]>([]);
    const [internalLoading, setInternalLoading] = useState(false);
    const [defaultPage, setDefaultPage] = useState(1)
    const [defaultPageSize, setDefaultPageSize] = useState(5)
    const [totalAlloysInDb, setTotalAlloysInDb] = useState(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const hasSelected = selectedRowKeys.length > 0;

    const isTableLoading: boolean = internalLoading || externalLoading

    const resetTable = () => {
        setAlloys([])
        setTotalAlloysInDb(0)
        setDefaultPage(1)
        setDefaultPageSize(5)
    }

    const selectedAlloys = alloys.filter(alloy => 
        selectedRowKeys.includes(alloy.name as React.Key)
    );


    const fetchAlloys = useCallback(async () => {
        setInternalLoading(true);
        try {
            const response = await fetch(`http://localhost:5290/api/alloys?page=${defaultPage}&pageSize=${defaultPageSize}`);
            const data = await response.json();
            
            if (data == null || data.totalCount == 0) {
                handleFetchFailure('Database does not contain any alloy.')
                resetTable()
            } else {
                const formattedData = data.alloys.map((a: any, index: number) => ({
                    ...a,
                    key: a.id || index
                }));

                setAlloys(formattedData)
                setTotalAlloysInDb(data.totalCount)
            }
        } catch (err) {
            handleFetchFailure('Error while fetching alloys. Please make sure you')
            resetTable()
        } finally {
            setInternalLoading(false);
        }
    }, [defaultPage, defaultPageSize]);

    useEffect(() => {
        fetchAlloys();
    }, [fetchAlloys, refreshTrigger]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<Alloy> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleVisualize = (xAxis: string, yAxis: string) => {

        console.log(`Visualizing ${xAxis} vs ${yAxis} for`, selectedAlloys);
    };

    return (
        <Content style={{ padding: '20px' }}>

            <Layout>

                {/* Alloys Table */}
                <Content>
                    
                    <Flex gap="middle" vertical>
                        <Flex align="center" gap="middle">
                            <Button 
                                type="primary" 
                                disabled={!hasSelected}
                                onClick={() => setIsDrawerOpen(true)} // Ouvre le drawer
                            >
                                Scatter Plot
                            </Button>
                            {hasSelected ? `Selected ${selectedRowKeys.length} alloys` : null}
                        </Flex>
                        <Table
                            loading={isTableLoading}
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={alloys}
                            scroll={{x: 'max-content'}}
                            pagination={{
                                
                                current: defaultPage,
                                pageSize: defaultPageSize,
                                total: totalAlloysInDb,
                                showSizeChanger: true,
                                showTotal: (total) => `Total ${total} alloys`,
                                onChange: (page, size) => {
                                    setDefaultPage(page);
                                    setDefaultPageSize(size);
                                },
                                pageSizeOptions: [5,10,20,50,100,200]
                            }}
                        />
                    </Flex>

                    <XYSelectionDrawer 
                        open={isDrawerOpen} 
                        onClose={() => setIsDrawerOpen(false)}
                        alloys={selectedAlloys}
                    />

                </Content>

            </Layout>
        </Content>
    );
};

export default DashboardContent;