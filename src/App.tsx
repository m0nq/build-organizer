import viteLogo from '/vite.svg';
import { useState } from 'react';
import { useReducer } from 'react';

import reactLogo from './assets/react.svg';
import './App.css';
import { AppState } from './const/AppState.ts';

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
    const [count, setCount] = useState(0);
    const [state, dispatch] = useReducer(appReducer, AppState.EMPTY);
    // four state component

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
