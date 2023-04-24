import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Button, Upload, Space, Table, Tag } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import type { ColumnsType } from 'antd/es/table';

type WorkResult = {
    id?: number;
    DocId?: number;
    IsSuspicious?: boolean;
    Legal?: number;
    Plagiarism?: number;
    SelfCite?: number;
    Unknown?: number,
    Status?: string;
}

type Work = {
    id?: number;
    name?: string;
    status?: string;
    result?: WorkResult;
}

type TableData = {
    key?: number | string,
    name?: string,
    status?: string,
    Plagiarism?: number,
    Legal?: number,
    SelfCite?: number,
    Unknown?: number
}

const columns: ColumnsType<TableData> = [
    {
        key: 'name',
        title: 'Работа',
        dataIndex: 'name',
    },
    {
        key: 'status',
        title: 'Статус',
        dataIndex: 'status',
    },
    {
        key: 'Plagiarism',
        title: 'Процент заимствования',
        dataIndex: 'Plagiarism',
    },
    {
        key: 'Legal',
        title: 'Процент цитирования',
        dataIndex: 'Legal',
    },
    {
        key: 'SelfCite',
        title: 'Процент самоцитирования',
        dataIndex: 'SelfCite',
    },
    {
        key: 'Unknown',
        title: 'Процент оригинальности',
        dataIndex: 'Unknown',
    },
]

export const MainPage: FC = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file as RcFile);
        });
        formData.append('name', 'testwork');
        setUploading(true);
        // You can use any AJAX library you like
        fetch('http://localhost:4000/works/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                setFileList([]);
                console.log('upload successfully.');
                console.log(res);
                const formData = new FormData();
                formData.append('docId', res.result.DocId);
                fetch('http://localhost:4000/works/check', {
                    method: 'POST',
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((res) => { console.log(res) })
            })
            .catch(() => {
                console.log('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    const [works, setWorks] = useState<Work[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/works', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => {
                setWorks(res);
            })
            .catch(() => {
                console.log('upload failed.');
            });
    }, [])

    const dataSource = works.map<TableData>((work) => ({
        key: work.id,
        name: work.name,
        status: work.status,
        Plagiarism: work.result?.Plagiarism,
        Legal: work.result?.Legal,
        SelfCite: work.result?.SelfCite,
        Unknown: work.result?.Unknown
    }))

    return (
        <Row>
            <Col>
                <Upload {...props}>
                    <Button>Выберите файл</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Идет загрузка...' : 'Начать'}
                </Button>
            </Col>
            <Col>
                <Table columns={columns} dataSource={dataSource} />
            </Col>
        </Row>
    );
};