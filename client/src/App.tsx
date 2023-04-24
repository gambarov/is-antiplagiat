import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { MainPage } from './pages/MainPage';
import { Layout } from 'antd';

function App() {
    return (
        <>
            <Navbar />
            <Layout.Content style={{ padding: '25px 200px 300px 350px' }}>
                <MainPage />
            </Layout.Content>
        </>
    );
}

export default App;
