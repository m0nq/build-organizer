import { ReactElement } from 'react';
import { useContext } from 'react';

import { Layout } from '@components/Layout.component.tsx';
import { FileUpload } from '@components/FileUpload.component.tsx';
import { PhaseBuilderContext } from '@contexts/PhaseBuilder.context.tsx';

function App(): ReactElement {
    const { output } = useContext(PhaseBuilderContext);

    return (
        <Layout>
            <h1>Upload Files</h1>

            <FileUpload />
            {output && (
                <div>
                    {output.split('\n').map((text) => <p className="output-text" key={text}>{text}</p>)}
                </div>
            )}
        </Layout>
    );
}

export default App;
