import { Layout } from 'antd'

const { Footer } = Layout

const DashboardFooter = () => {
    
    return (
        <Footer
          style={{
            textAlign: 'center',
            color: '#888888',
          }}
        >
          Alloys Dashboard ©{new Date().getFullYear()} by <a href='https://github.com/arlealexandre'>@arlealexandre</a>
        </Footer>
    )
}

export default DashboardFooter