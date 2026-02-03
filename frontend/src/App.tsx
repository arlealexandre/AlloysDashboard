import { Layout, notification } from 'antd'
import DashboardFooter from './components/DashboardFooter.tsx'
import DashboardHeader from './components/DashboardHeader.tsx'
import DashboardContent from './components/DashboardContent.tsx'
import { useState } from 'react'

const App = () => {

    const [api, contextHolder] = notification.useNotification();
    const [isUploading, setIsUploading] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const openSuccessNotification = (message: string) => {
        api['success']({
        title: 'Success',
        description:
            message,
        });
    };

    const openErrorNotification = (message: string) => {
        api['error']({
        title: 'Error',
        description:
            message,
        });
    };

    const handleUploadSuccess = (message: string) => {
      openSuccessNotification(message)
      setIsUploading(false)
      setRefreshTrigger(prev => prev + 1);
    }

    return (
      <Layout style={{ minHeight: '100vh'}}>

        {contextHolder}

        {/* Header */}
        <DashboardHeader
          isUploading={isUploading}
          handleOnStartUploading={() => setIsUploading(true)}
          handleUploadSuccess={(message) => handleUploadSuccess(message)}
          handleUploadFailure={(message) => openErrorNotification(message)}
        />

        {/* Main content */}
        <DashboardContent refreshTrigger={refreshTrigger} externalLoading={isUploading} handleFetchFailure={(message) => openErrorNotification(message)}/>

        {/* Footer */}
        <DashboardFooter />

      </Layout>
    )
}

export default App