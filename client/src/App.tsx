import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { MainPage } from './pages/MainPage';
import { Layout } from 'antd';

function App() {
    return (
        <>
            <Navbar />
            {/* top | right | bottom | left */}
            <Layout.Content style={{ padding: '0 15% 0 15%', minHeight: '100vh' }}>
                <MainPage />
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center', position: "sticky", bottom: "0" }}>IS-Antiplagiat ©2023 Created by DG</Layout.Footer>
        </>
    );
}

export default App;
