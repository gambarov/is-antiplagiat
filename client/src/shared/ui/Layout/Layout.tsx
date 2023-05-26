import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

const { Footer, Content } = AntdLayout;

type Props = {
    headerSlot: ReactNode;
    siderSlot?: ReactNode;
};

export const Layout = (props: Props) => {
    return (
        <AntdLayout>
            {props.headerSlot}
            {props.siderSlot}
            <Content>
                <Outlet />
            </Content>
            <Footer>Gambarov D.I. (C) 2023</Footer>
        </AntdLayout>
    );
};
