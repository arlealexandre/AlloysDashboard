import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface Props {
    isUploading: boolean
    onStartUploading: () => void
    onSuccess: (message: string) => void
    onFailure: (message: string) => void
}

const UploadButton = ({isUploading, onStartUploading, onSuccess, onFailure}: Props) => {

    const handleJsonImport = (file: File) => {

        if (file.type !== 'application/json') {
            onFailure("Only JSON files are accepted.")
            return false
        }

        // Blocking call
        onStartUploading()
        const formData = new FormData()
        formData.append('file', file)

        const response = fetch('http://localhost:5290/api/alloys/upload-json', {
            method: 'POST',
            body: formData,
        })

        response.then((result) => {
            if (result.ok) {
                onSuccess("File imported and database updated!")
            } else {
                onFailure("Import failed.")
            }
        })
        .catch((error) => {
            onFailure(`Upload error: ${error}`)
        })
    }
    
    return (
        <Upload accept="application/json" beforeUpload={handleJsonImport} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined />} disabled={isUploading}>Import JSON file</Button>
        </Upload>
    )
}

export default UploadButton