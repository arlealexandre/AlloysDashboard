import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const UploadButton = () => {

    const handleJsonImport = (file: File) => {
        if (file.type == 'application/json') {
            
        }
    }
    
    return (
        <Upload accept="application/json" beforeUpload={handleJsonImport} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined />}>Import JSON file</Button>
        </Upload>
    )
}

export default UploadButton