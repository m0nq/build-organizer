import { ReactNode } from 'react';
import { ReactElement } from 'react';

export const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] h-screen">
            <main>{children}</main>
        </div>
    );
};
