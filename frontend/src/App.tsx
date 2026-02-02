import { Layout } from 'antd'
import DashboardFooter from './components/DashboardFooter.tsx'
import DashboardHeader from './components/DashboardHeader.tsx'
import DashboardContent from './components/DashboardContent.tsx'

const App = () => {

  return (
    <Layout style={{ minHeight: '100vh'}}>

      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <DashboardContent />

      {/* Footer */}
      <DashboardFooter />

    </Layout>
  )
}

export default App