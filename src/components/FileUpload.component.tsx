import { Pane } from 'evergreen-ui';
import { FileUploader } from 'evergreen-ui';
import { MimeType } from 'evergreen-ui';
import { rebaseFiles } from 'evergreen-ui';
import { Alert } from 'evergreen-ui';
import { FileCard } from 'evergreen-ui';
import { majorScale } from 'evergreen-ui';
import { FileRejectionReason } from 'evergreen-ui';
import { Dispatch } from 'react';
import { ReactElement } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { Fragment } from 'react';
import { useContext } from 'react';

import { FilesProcessContext } from '@contexts/PhaseBuilder.context.tsx';

export const FileUpload = (): ReactElement => {
    const maxFiles = 5;
    const [files, setFiles]: [any, Dispatch<any>] = useState([]);
    const [fileRejections, setFileRejections]: [any, Dispatch<any>] = useState([]);
    const { setFilesToProcess } = useContext(FilesProcessContext);

    const acceptedMimeTypes = useMemo(() => [MimeType.json], []);
    const values = useMemo(() => [...files, ...fileRejections.map((fileRejection: { file: any; }) => {
        return fileRejection.file;
    })], [files, fileRejections]);

    const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
    const fileCountError = `You can upload up to 5 files. Please remove ${fileCountOverLimit} ${fileCountOverLimit === 1 ? 'file' : 'files'}.`;

    const handleRemove = useCallback((file: any) => {
            const updatedFiles = files.filter((existingFile: any) => existingFile !== file);
            const updatedFileRejections = fileRejections.filter((fileRejection: {
                file: any;
            }) => fileRejection.file !== file);

            // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
            // rejected for being over the file count limit, but might be under the limit now!)
            const { accepted, rejected } = rebaseFiles(
                [...updatedFiles, ...updatedFileRejections.map((fileRejection: { file: any; }) => fileRejection.file)],
                { acceptedMimeTypes, maxFiles }
            );

            setFiles(accepted);
            setFileRejections(rejected);
        },
        [acceptedMimeTypes, files, fileRejections, maxFiles]
    );

    return (
        <Pane maxWidth={654}>
            <FileUploader acceptedMimeTypes={[MimeType.json]}
                maxFiles={maxFiles}
                description="You can upload up to 5 json files."
                disabled={files.length + fileRejections.length >= maxFiles}
                dragMaxFilesMessage={(maxFiles: number) => `You can only import up to ${maxFiles} files`}
                onAccepted={(files: File[]) => {
                    setFiles(files);
                    // dispatch({ type: AppState.PROCESSING, payload: files });
                    setFilesToProcess(files);
                }}
                onRejected={setFileRejections}
                values={values}
                renderFile={(file: File, index: number) => {
                    const { name, size, type }: { name: string, size: number, type: string } = file;
                    const renderFileCountError: boolean = index === 0 && fileCountOverLimit > 0;

                    // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
                    // so don't show those errors individually on each <FileCard />
                    const fileRejection = fileRejections.find((fileRejection: {
                        file: File,
                        reason: FileRejectionReason
                    }) => {
                        return fileRejection.file === file && fileRejection.reason !== FileRejectionReason.OverFileLimit;
                    });
                    const { message } = fileRejection || {};

                    // I believe from here you can dispatch and process the files

                    return (
                        <Fragment key={`${file.name}-${index}`}>
                            {renderFileCountError &&
                              <Alert intent="danger" marginBottom={majorScale(2)} title={fileCountError} />}
                            <FileCard isInvalid={fileRejection != null}
                                name={name}
                                onRemove={() => handleRemove(file)}
                                sizeInBytes={size}
                                type={type}
                                validationMessage={message} />
                        </Fragment>
                    );
                }}
            />
        </Pane>
    );
};
