import React, { FC, useState, useEffect } from "react";
import { Row, Col, Button, Upload, Table, Breadcrumb, theme, notification, Card } from "antd";
import type { UploadProps, UploadFile } from "antd";
import type { RcFile } from "antd/es/upload/interface";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

type Submission = {
    id?: number;
    answers?: Answer[];
    status?: string;
    comment?: string;
};

type AnswerResult = {
    id?: number;
    DocId?: number;
    IsSuspicious?: boolean;
    Legal?: number;
    Plagiarism?: number;
    SelfCite?: number;
    Unknown?: number;
    Status?: string;
};

type Answer = {
    id?: number;
    status?: string;
    result?: AnswerResult;
};

type TableData = {
    key?: number | string;
    name?: any;
    status?: string;
    Plagiarism?: number;
    Legal?: number;
    SelfCite?: number;
    Unknown?: number;
};

const columns: ColumnsType<TableData> = [
    {
        key: "id",
        title: "Работа",
        dataIndex: "name",
    },
    {
        key: "status",
        title: "Статус",
        dataIndex: "status",
    },
    {
        key: "Plagiarism",
        title: "% заимствования",
        dataIndex: "Plagiarism",
    },
    {
        key: "Legal",
        title: "% цитирования",
        dataIndex: "Legal",
    },
    {
        key: "SelfCite",
        title: "% самоцитирования",
        dataIndex: "SelfCite",
    },
    {
        key: "Unknown",
        title: "% оригинальности",
        dataIndex: "Unknown",
    },
];

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const defaultSubmission: Submission = {
    answers: [],
    status: 'NOT_SUBMITTED',
    comment: '',
}

export const MainPage: FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Уведомление',
            description:
                'Работа успешно загружена и отправлена на проверку!',
        });
    };

    const handleCheckStatus = () => {
        const answer = answers[answers.length - 1];
        axios<Answer>({
            method: "post",
            url: "http://localhost:4000/answers/status",
            data: { 'docId': answer.result?.DocId?.toString() as string },
        })
            .then(function (response) {
                console.log(response)

                axios<Submission>({
                    method: "get",
                    url: "http://localhost:4000/submissions/3",
                })
                    .then(function (response) {
                        console.log(response.data);
                        if (response.data != null) {
                            setSubmission(response.data);
                            setAnswers(response.data.answers as Answer[]);
                        }
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("file", file as RcFile);
        });
        formData.append('submission_id', '3');
        setUploading(true);

        axios<Answer>({
            method: "post",
            url: "http://localhost:4000/answers/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                setSubmission({ ...submission, 'status': 'PENDING' })
                setAnswers([...answers, response.data])

                axios({
                    method: "post",
                    url: "http://localhost:4000/answers/check",
                    data: { 'docId': response.data.result?.DocId }
                })
                    .then((res) => {
                        openNotificationWithIcon('success');
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch(function (response) {
                //handle error
                console.log(response);
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

    const [submission, setSubmission] = useState<Submission>(defaultSubmission);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        axios<Submission>({
            method: "get",
            url: "http://localhost:4000/submissions/3",
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data != null) {
                    setSubmission(response.data);
                    setAnswers(response.data.answers as Answer[]);
                }
            })
            .catch(function (response) {
                console.log(response);
            });
    }, []);

    const dataSource = answers.map<TableData>((answer) => ({
        key: answer.id,
        name: answer.id,
        status: answer.status === 'PENDING' ? "На проверке" : "Проверена",
        Plagiarism: answer.result?.Plagiarism,
        Legal: answer.result?.Legal,
        SelfCite: answer.result?.SelfCite,
        Unknown: answer.result?.Unknown,
    }));

    const translateSubmissionStatus = () => {
        switch (submission.status) {
            case 'NOT_SUBMITTED':
                return 'Работа не отправлялась'
            case 'PENDING':
                return 'Отправлена на проверку'
            case 'ON_REVIEW':
                return 'На проверке'
            case 'PASSED':
                return 'Прошла проверку'
            case 'FAILED':
                return 'Непрошла проверку'
            default:
                return submission.status;
        }
    }

    return (
        <>
            {contextHolder}
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Курс №1</Breadcrumb.Item>
                <Breadcrumb.Item>Задание №1</Breadcrumb.Item>
                <Breadcrumb.Item>Загрузка по заданию №1</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: colorBgContainer, padding: '25px', minHeight: '100vh' }}>
                <Row justify="space-around" align="top">
                    <Col span={4}>
                        <Card title="Загрузка ответа">
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
                                {uploading ? "Идет загрузка..." : "Начать"}
                            </Button>
                        </Card>
                    </Col>
                    <Col span={19}>
                        <Card title='Состояние прогресса'>
                            Состояние ответа: {translateSubmissionStatus()}
                            <br/>
                            <br/>
                            {submission.comment ? 'Комментарий: ' + submission.comment : ''}
                            <Table columns={columns} dataSource={dataSource} />
                            <Button
                                type="primary"
                                onClick={handleCheckStatus}
                                disabled={answers.length === 0}
                                style={{ marginTop: 16 }}
                            >
                                Обновить результаты
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};
