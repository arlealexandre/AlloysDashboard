import { useCallback, useEffect, useState } from 'react';
import { Button, Flex, Layout } from 'antd';
import type { Alloy } from '../types/Alloy';
import AlloysTable from './AlloysTable';
import ScatterPlotViewer from './ScatterPlotViewer';
import { SearchOutlined } from '@ant-design/icons';
import SearchDrawer, { type SearchFormData } from './SearchDrawer';

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
    const [isScatterDrawerOpen, setIsScatterDrawerOpen] = useState(false)
    const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false)
    const [selectedAlloys, setSelectedAlloys] = useState<Alloy[]>([]);
    const [searchFormData, setSearchFormData] = useState<SearchFormData>();

    const hasSelected = selectedAlloys.length > 0

    const isTableLoading: boolean = internalLoading || externalLoading

    const resetTable = () => {
        setAlloys([])
        setTotalAlloysInDb(0)
        setDefaultPage(1)
        setDefaultPageSize(10)
    }

    const fetchAlloys = useCallback(async () => {
        setInternalLoading(true);
        try {
            var query = `http://localhost:5290/api/alloys?page=${defaultPage}&pageSize=${defaultPageSize}`

            if (searchFormData?.productType) {
                query += `&productType=${searchFormData.productType}`
            }

            if (searchFormData?.productShape) {
                query += `&productShape=${searchFormData.productShape}`
            }

            const response = await fetch(query);
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
    }, [defaultPage, defaultPageSize, searchFormData]);

    useEffect(() => {
        fetchAlloys();
    }, [fetchAlloys, refreshTrigger]);

    return (
        <Content style={{ padding: '20px' }}>

            <Layout>

                {/* Alloys Table */}
                <Content>
                    
                    <Flex gap="middle" vertical>

                        <Flex justify='space-between'>
                            <Flex align="center" gap="middle">
                                <Button 
                                    type="primary" 
                                    disabled={!hasSelected}
                                    onClick={() => setIsScatterDrawerOpen(true)}
                                >
                                    Scatter Plot
                                </Button>
                                {hasSelected ? `Selected ${selectedAlloys.length} alloys` : null}
                            </Flex>

                            <Button type='primary' variant='outlined' icon={<SearchOutlined />} disabled={alloys.length == 0} onClick={() => setIsSearchDrawerOpen(true)}>Search</Button>

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
                            onSelectionChange={(selected) => setSelectedAlloys(selected)}              
                        />

                    </Flex>

                    <ScatterPlotViewer 
                        isOpen={isScatterDrawerOpen} 
                        onClose={() => setIsScatterDrawerOpen(false)}
                        filteredAlloys={selectedAlloys}
                    />

                    <SearchDrawer 
                        isOpen={isSearchDrawerOpen} 
                        onClose={() => setIsSearchDrawerOpen(false)}
                        onSubmit={(formData: SearchFormData) => setSearchFormData(formData)}
                    />

                </Content>

            </Layout>
        </Content>
    );
};

export default DashboardContent;