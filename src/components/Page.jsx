import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetContentQuery } from '../app/services/content';

const Page = () => {
    const { isLoading } = useGetContentQuery(undefined, {
        selectFromResult: ({ data }) => ({
            isLoading: !Boolean(data),
        }),
    });

    return (
        <div id="app-page">
            <main id="app-main">{isLoading ? null : <Outlet />}</main>
        </div>
    );
};

export default Page;
