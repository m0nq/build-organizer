import { ReactElement } from 'react';
import { useContext } from 'react';

import { Container } from '@components/Container.component.tsx';
import { Layout } from '@components/Layout.component.tsx';
import { FileUpload } from '@components/FileUpload.component.tsx';
import { PhaseBuilderContext } from '@contexts/PhaseBuilder.context.tsx';

import './App.css';

// App component should have at least 4 states - empty, loading, error, complete

function App(): ReactElement {
    // const [state, dispatch]: [AppState, Dispatch<{
    //     type: AppState,
    //     payload?: File[]
    // }>] = useReducer(appReducer, AppState.EMPTY);
    const { output } = useContext(PhaseBuilderContext);

    return (
        <Layout>
            <Container className="mt-20">
                <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
                    Upload Files
                </h1>

                {/*{state === AppState.PROCESSING ? <Spinner /> : <FileUpload />}*/}
                <FileUpload />
                {output && (
                    <div className="output-container">
                        {output.split('\n').map((text) => <p style={{ textAlign: 'left' }} key={text}>{text}</p>)}
                    </div>
                )}
            </Container>
        </Layout>
    );
}

export default App;
