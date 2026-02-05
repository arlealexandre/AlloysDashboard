import { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Layout } from 'antd';
import type { Alloy } from '../types/Alloy';
import type { TableRowSelection } from 'antd/es/table/interface';
import AlloysTable from './AlloysTable';
import ScatterPlotViewer from './ScatterPlotViewer';

const { Content } = Layout;

interface Props {
    refreshTrigger: number
    externalLoading: boolean
    handleFetchFailure: (message: string) => void
}


const DashboardContent = ({refreshTrigger, externalLoading, handleFetchFailure}: Props) => {

    const [alloys, setAlloys] = useState<Alloy[]>([])
    const [internalLoading, setInternalLoading] = useState(false)
    const [defaultPage, setDefaultPage] = useState(1)
    const [defaultPageSize, setDefaultPageSize] = useState(10)
    const [totalAlloysInDb, setTotalAlloysInDb] = useState(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const hasSelected = selectedRowKeys.length > 0

    const isTableLoading: boolean = internalLoading || externalLoading

    const resetTable = () => {
        setAlloys([])
        setTotalAlloysInDb(0)
        setDefaultPage(1)
        setDefaultPageSize(10)
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
            handleFetchFailure('Error retrieving alloys. Please ensure that the database is populated and active.')
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
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                Scatter Plot
                            </Button>
                            {hasSelected ? `Selected ${selectedRowKeys.length} alloys` : null}
                        </Flex>
                        
                        {/* Alloys Table */}

                        <AlloysTable 
                            alloys={alloys}
                            isLoading={isTableLoading} pagination={{
                                page: defaultPage,
                                pageSize: defaultPageSize,
                                total: totalAlloysInDb,
                                onChange: function (page: number, pageSize: number): void {
                                    setDefaultPage(page)
                                    setDefaultPageSize(pageSize)
                                }
                            }} 
                            rowSelection={rowSelection}                      
                        />

                    </Flex>

                    <ScatterPlotViewer 
                        isOpen={isDrawerOpen} 
                        onClose={() => setIsDrawerOpen(false)}
                        filteredAlloys={selectedAlloys}
                    />

                </Content>

            </Layout>
        </Content>
    );
};

export default DashboardContent;