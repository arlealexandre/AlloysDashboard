import { Flex, Table, Tag, type TableColumnsType } from "antd"
import type { Alloy } from "../types/Alloy"
import type { Composition } from "../types/Composition"
import { useState } from "react"
import type { TableRowSelection } from "antd/es/table/interface"

interface Props {
    alloys: Alloy[],
    isLoading: boolean,
    pagination: {
        page: number,
        pageSize: number,
        total: number,
        onChange: (page: number, pageSize: number) => void
    },
    onSelectionChange: (selected: Alloy[]) => void
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
]

const AlloysTable = ({alloys, isLoading, pagination, onSelectionChange}: Props) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (keys: React.Key[]) => {
        setSelectedRowKeys(keys);

        const selected = alloys.filter(a =>
            keys.includes(a.name)
        );

        onSelectionChange(selected);
    };

    const rowSelection: TableRowSelection<Alloy> = {
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <Table
            rowKey="name"
            loading={isLoading}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={alloys}
            scroll={{x: 'max-content'}}
            pagination={{
                current: pagination.page,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} alloys`,
                onChange: pagination.onChange,
                pageSizeOptions: [10,20,50,100]
            }}
        />
    )
}

export default AlloysTable