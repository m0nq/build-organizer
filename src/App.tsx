import { useReducer } from 'react';
import { Dispatch } from 'react';

import { AppState } from '@const/AppState.ts';
import { FileUpload } from '@components/FileUpload.component.tsx';

import './App.css';

// App component should have at least 4 states - empty, loading, error, complete
// while processing a file, if there are any syntax errors (i.e. JSON.parse -> Error) then move to error state
// take files in, look for file named phases.json, if it doesn't exist throw an error. Otherwise parse json string
// make a new array empty array
// for each object in the array (of the file),
//   (am i in the list?) if the name is already in the list
//     (yes, are my prerequisites in the list?) if name's in prerequisites are already in the list
//       move on to next object
//     (no, add prerequisites to beginning) otherwise add prerequisite name to list
//   (if I'm not in the list) otherwise add prerequisites to list, and then add name
// add names to set output(?)

// alternate:
//   (are my prerequisites in the list?) if my prerequisites are in the list
//     (yes, am I in the list?) if the name is in the list
//       (no, find position of my prerequisites and add me after it)
//     (no, add them)
//     (am I in the list?)
//       (yes, move on...)
//       (no, add me to the list)

// for each element in list
//   grab corresponding input file and repeat process above

const appReducer = (state: AppState, { type }: { type: AppState }) => {
        switch (type) {
            case AppState.EMPTY:
                return AppState.EMPTY;
            case AppState.ERROR:
                return AppState.ERROR;
            case AppState.LOADING:
                return AppState.LOADING;
            case AppState.COMPLETE:
                return AppState.COMPLETE;
            default:
                return state;
        }
    }
;

function App() {
    const [state, dispatch]: [AppState, Dispatch<{ type: AppState }>] = useReducer(appReducer, AppState.EMPTY);
    // four state component

    return (
        <>
            {state === AppState.EMPTY && (<FileUpload dispatch={dispatch} />)}
            {/*{*/}
            {/*    state === AppState.LOADING && (*/}
            {/*        <Pane maxWidth={654}>*/}
            {/*            <FileUploader />*/}
            {/*        </Pane>)*/}
            {/*}*/}
            {/*{*/}
            {/*    state === AppState.ERROR && (*/}
            {/*        <Pane maxWidth={654}>*/}
            {/*            <FileUploader />*/}
            {/*        </Pane>)*/}
            {/*}*/}
            {/*{*/}
            {/*    state === AppState.COMPLETE && (*/}
            {/*        <Pane maxWidth={654}>*/}
            {/*            <FileUploader />*/}
            {/*        </Pane>)*/}
            {/*}*/}
        </>
    );
}

export default App;
