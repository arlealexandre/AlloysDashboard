import { Layout } from 'antd'
import UploadButton from './UploadButton'

const { Header } = Layout

interface Props {
  isUploading: boolean
  handleOnStartUploading: () => void
  handleUploadSuccess: (message: string) => void
  handleUploadFailure: (message: string) => void
}

const DashboardHeader = ({isUploading, handleOnStartUploading, handleUploadSuccess, handleUploadFailure}: Props) => {

    return (
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px'
          }}
        >
          <div style={{fontSize: 18, fontWeight: 600, color: '#ffffff'}}>Alloys Dashboard</div>

          <UploadButton isUploading={isUploading} onStartUploading={handleOnStartUploading} onSuccess={handleUploadSuccess} onFailure={handleUploadFailure} />

        </Header>
    )
}

export default DashboardHeader