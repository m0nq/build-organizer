import { ReactElement } from 'react';
import { useContext } from 'react';

import { Container } from '@components/Container.component.tsx';
import { Layout } from '@components/Layout.component.tsx';
import { FileUpload } from '@components/FileUpload.component.tsx';

import './App.css';
import { PhaseContext } from '@/contexts/Phase.context.tsx';

// App component should have at least 4 states - empty, loading, error, complete

function App(): ReactElement {
    // const [state, dispatch]: [AppState, Dispatch<{
    //     type: AppState,
    //     payload?: File[]
    // }>] = useReducer(appReducer, AppState.EMPTY);
    const { output } = useContext(PhaseContext);

    return (
        <Layout>
            <Container className="mt-20">
                <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
                    Upload Files
                </h1>

                {/**/}

                {/*{state === AppState.PROCESSING && <Spinner />}*/}
                <FileUpload />
                {output && (<code>{output}</code>)}
                {/*{state !== AppState.COMPLETE && <input type="file"/>}*/}
            </Container>
        </Layout>
    );
}

export default App;
