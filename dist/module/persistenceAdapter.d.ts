import AskCore = require('ask-sdk-core');
import { RequestEnvelope } from 'ask-sdk-model';
export declare class FileSystemPersistenceAdapter implements AskCore.PersistenceAdapter {
    private path;
    private attributes;
    private separateFilesByUser;
    private userId;
    private filePath;
    constructor(path: string);
    getAttributes(requestEnvelope: RequestEnvelope): Promise<{
        [key: string]: any;
    }>;
    saveAttributes(requestEnvelope: RequestEnvelope, attributes: {
        [key: string]: any;
    }): Promise<void>;
    deleteAttributes?(requestEnvelope: RequestEnvelope): Promise<void>;
    private getUserAttributes;
    private setUserAttributes;
    private writeFile;
    private setUserByRequest;
}
