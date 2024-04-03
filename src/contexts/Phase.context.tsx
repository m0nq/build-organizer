import { createContext } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';

export const PhaseContext = createContext({
    output: '',
    setOutput: (value: string) => {}
});
export const FilesProcessContext = createContext({
    filesToProcess: [] as File[],
    setFilesToProcess: (value: File[]) => {}
});

export const PhaseProvider = ({ children }: { children: ReactNode }) => {
    const [output, setOutput] = useState<string>('');
    const [filesToProcess, setFilesToProcess] = useState([] as File[]);

    useEffect(() => {
        (() => {
            // while processing a file, if there are any syntax errors (i.e. JSON.parse -> Error) then move to error state
            // take files in, look for file named phases.json, if it doesn't exist throw an error. Otherwise, parse json string
            // make a new array empty array
            // for each object in the array (of the file),
            //   (am I in the list?) if the name is already in the list
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
            // const onDrop = useCallback((acceptedFiles: Blob[]) => {
            filesToProcess.forEach(file => {
                const fileReader = new FileReader();
                fileReader.onabort = () => console.log('file reading was aborted');
                fileReader.onerror = () => console.log('file reading has failed');
                fileReader.onload = () => {
                    setOutput(fileReader.result as string);
                };
                fileReader.readAsText(file);
                console.log('file ->', file);
            });
            // }, []);
        })();
    }, [filesToProcess]);

    return (
        <PhaseContext.Provider value={{ output, setOutput }}>
            <FilesProcessContext.Provider value={{ filesToProcess, setFilesToProcess }}>
                {children}
            </FilesProcessContext.Provider>
        </PhaseContext.Provider>
    );
};
