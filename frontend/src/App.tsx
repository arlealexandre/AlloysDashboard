import { Layout, Button, ConfigProvider, theme as antdTheme, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const App = () => {

  const handleJsonImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const json = JSON.parse(text)
        console.log('JSON importé :', json)
        // ici tu peux stocker le JSON dans un state, l’envoyer à ton backend, etc.
      } catch (err) {
        console.error('Fichier JSON invalide', err)
      }
    }
    reader.readAsText(file)
    // empêcher l’upload “classique” d’AntD, on gère nous‑mêmes
    return false
  }

  return (

    <ConfigProvider
      theme={{
        algorithm: antdTheme.defaultAlgorithm,
        token: {
          colorBgElevated: '#141414',
          colorBgLayout: '#141414',
          colorBgBase: '#141414',
          colorBgContainer: '#141414',
          colorText: '#ffffff',
          colorPrimary: '#65a9f3',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh'}}>

        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: '#111111'
          }}
        >
          <div style={{fontSize: 18, fontWeight: 600}}>Alloys Dashboard</div>

          <Upload
            accept="application/json"
            beforeUpload={handleJsonImport}
            showUploadList={false}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Import JSON file
            </Button>
          </Upload>
        </Header>

        <Content style={{ padding: '24px' }}>
          <div
            style={{
              minHeight: 280,
              padding: 24,
              borderRadius: 8,
              color: '#ffffff',
            }}
          >
            Content
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            background: '#141414',
            color: '#888888',
          }}
        >
          Alloys Dashboard ©{new Date().getFullYear()}
        </Footer>

      </Layout>
    </ConfigProvider>
  )
}

export default App
