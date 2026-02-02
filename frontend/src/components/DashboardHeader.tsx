import { Layout } from 'antd'
import UploadButton from './UploadButton'

const { Header } = Layout

const DashboardHeader = () => {

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

          <UploadButton />

        </Header>
    )
}

export default DashboardHeader