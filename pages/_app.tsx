import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import React from "react";

type MyAppProps = AppProps & {
    session: any;
};

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <AntdRegistry>
                <Component {...pageProps} />
            </AntdRegistry>
        </SessionProvider>
    );
}

export default MyApp;
