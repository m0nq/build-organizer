import { createContext } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';
import { useEffect } from 'react';
import { processFiles } from '@utils/process-files.utils.ts';

export const PhaseBuilderContext = createContext({
    output: '',
    setOutput: (_: string) => {}
});
export const FilesProcessContext = createContext({
    filesToProcess: [] as File[],
    setFilesToProcess: (_: File[]) => {}
});

export const PhaseProvider = ({ children }: { children: ReactNode }) => {
    const [output, setOutput] = useState<string>('');
    const [filesToProcess, setFilesToProcess] = useState([] as File[]);

    useEffect(() => {
        (async () => {

            // pass in app state dispatch
            setOutput(await processFiles(filesToProcess));
        })();
    }, [filesToProcess]);

    return (
        <PhaseBuilderContext.Provider value={{ output, setOutput }}>
            <FilesProcessContext.Provider value={{ filesToProcess, setFilesToProcess }}>
                {children}
            </FilesProcessContext.Provider>
        </PhaseBuilderContext.Provider>
    );
};
