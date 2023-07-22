import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetContentQuery } from '../app/services/content';

const Page = () => {
    const { isLoading, data } = useGetContentQuery(undefined, {
        refetchOnReconnect: true,
        selectFromResult: ({ data }) => ({
            isLoading: !Boolean(data),
            data,
        }),
    });
    console.log('data:', data);
    console.log('isLoading:', isLoading);

    useEffect(() => {
        return () => {
            console.log('useEffect unmount:', data, isLoading);
        };
    }, []);

    return (
        <div id="app-page">
            <main id="app-main">{isLoading ? null : <Outlet />}</main>
        </div>
    );
};

export default Page;
