import { ReactNode } from 'react';
import { ReactElement } from 'react';

export const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};
