import AskCore = require('ask-sdk-core');
import { RequestEnvelope } from 'ask-sdk-model';
import fs = require('fs');

export class FileSystemPersistenceAdapter implements AskCore.PersistenceAdapter {
    private attributes: { [key: string]: any; };
    private separateFilesByUser: boolean;
    private userId: string;
    private filePath: string;

    constructor(private path: string) {
        if (!path) { throw new Error(`Undefined file path.`); }
        this.separateFilesByUser = this.path.charAt(this.path.length - 1) === '/';
    }

    getAttributes(requestEnvelope: RequestEnvelope): Promise<{ [key: string]: any; }> {
        this.setUserByRequest(requestEnvelope);

        return (async () => {
            if (this.getUserAttributes() !== void 0) { return this.getUserAttributes(); }
            if (!fs.existsSync(this.filePath)) {
                await this.saveAttributes(requestEnvelope, {});
                return this.getUserAttributes();
            }

            return await new Promise<{ [key: string]: any; }>((res) => {
                fs.readFile(this.filePath, 'utf8', (err, data) => {
                    if (err) { throw new Error(`Unable to access file ${this.filePath}.`); }
                    this.attributes = JSON.parse(data);
                    res(this.getUserAttributes());
                });
            });
        })();
        
    }
    saveAttributes(requestEnvelope: RequestEnvelope, attributes: { [key: string]: any; }): Promise<void> {
        this.setUserByRequest(requestEnvelope);
        this.setUserAttributes(attributes);
        return this.writeFile(JSON.stringify(this.attributes));
    }

    deleteAttributes?(requestEnvelope: RequestEnvelope): Promise<void> {
        this.setUserByRequest(requestEnvelope);
        return this.saveAttributes(requestEnvelope, {});
    }

    private getUserAttributes(): { [key: string]: any; } {
        if (this.attributes === void 0) { return void 0; }
        return this.separateFilesByUser ?
            this.attributes :
            this.attributes[this.userId];
    }

    private setUserAttributes(attributes: { [key: string]: any; }): void {
        if (this.separateFilesByUser) {
            this.attributes = attributes;
        } else {
            if (this.attributes === void 0) { this.attributes = {}; }
            this.attributes[this.userId] = attributes;
        }
    }

    private writeFile(data: string): Promise<void> {
        return new Promise<void>((res) => {
            fs.writeFile(this.filePath, data, { flag: 'w' }, (err) => {
                if (err) { throw err; }
                res();
            });
        });
    }

    private setUserByRequest(requestEnvelope: RequestEnvelope) {
        if (this.userId !== void 0) { return; }

        this.userId = requestEnvelope.session.user.userId;        
        this.filePath = this.separateFilesByUser ? this.path + this.userId + ".json" : this.path;
    }
}