import { Button, Drawer, Flex, Form, Select, Space } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react";

interface Props {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: SearchFormData) => void
}

export interface SearchFormData {
    productType: string | null
    productShape: string | null
}

const SearchDrawer = ({isOpen, onClose, onSubmit}: Props) => {

    const [form] = Form.useForm();

    const [productTypes, setProductTypes] = useState<string[]>([])
    const [productShapes, setProductShapes] = useState<string[]>([])
    const [searchFormData, setSearchFormData] = useState<SearchFormData>({
        productType: null,
        productShape: null
    })


    const fetchProductTypes = useCallback(async () => {
        const response = await fetch(`http://localhost:5290/api/alloys/productTypes`)
        const data = await response.json()
                
        if (Array.isArray(data.productTypes)) {
            setProductTypes(data.productTypes)
        }
    }, [])

    const fetchProductShapes = useCallback(async () => {
        const response = await fetch(`http://localhost:5290/api/alloys/productShapes`)
        const data = await response.json()
                
        if (Array.isArray(data.productShapes)) {
            setProductShapes(data.productShapes)
        }
    }, [])
    
    useEffect(() => {

        fetchProductTypes()
        fetchProductShapes()

    }, [fetchProductTypes, fetchProductShapes])

    const productTypeOptions = useMemo(() => {
        return Array.from(productTypes).sort().map((productType) => ({label: productType, value: productType}))
    }, [productTypes])

    const productShapeOptions = useMemo(() => {
        return Array.from(productShapes).sort().map((productShape) => ({label: productShape, value: productShape}))
    }, [productShapes])

    const handleOnClose = () => {
        onClose()
    }

    const resetSearchFormData = () => {
        setSearchFormData({
            productType: null,
            productShape: null
        })
    }

    return (
        <Drawer 
            title="Alloy Research" 
            open={isOpen} 
            onClose={handleOnClose}
            size={800}
            destroyOnHidden
        >
            <Form
                layout='vertical'
                form={form}
            >
                {/* Product Type */}
                <Form.Item label="Product Type">
                    <Flex gap={5}>
                        <Select  style={{width: '100%'}}
                            placeholder='Select Type'
                            value={searchFormData.productType}
                            options={productTypeOptions}
                            onChange={(value) => setSearchFormData(prev => ({ 
                                ...prev,
                                productType: value
                            }))}
                        />
                    </Flex>
                </Form.Item>

                {/* Product Shape */}
                <Form.Item label="Product Shape">
                    <Flex gap={5}>
                        <Select  style={{width: '100%'}}
                            placeholder='Select Shape'
                            options={productShapeOptions}
                            value={searchFormData.productShape}
                            onChange={(value) => setSearchFormData(prev => ({ 
                                ...prev,
                                productShape: value
                            }))}
                        />
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button type="primary" onClick={resetSearchFormData}>Reset</Button>
                        <Button type="primary" onClick={() => onSubmit(searchFormData)}>Submit</Button>
                    </Space>
                </Form.Item>

            </Form>

        </Drawer>
    )
}

export default SearchDrawer