"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemPersistenceAdapter = void 0;
const fs = require("fs");
class FileSystemPersistenceAdapter {
    constructor(path) {
        this.path = path;
        if (!path) {
            throw new Error(`Undefined file path.`);
        }
        this.separateFilesByUser = this.path.charAt(this.path.length - 1) === '/';
    }
    getAttributes(requestEnvelope) {
        this.setUserByRequest(requestEnvelope);
        return (() => __awaiter(this, void 0, void 0, function* () {
            if (this.getUserAttributes() !== void 0) {
                return this.getUserAttributes();
            }
            if (!fs.existsSync(this.filePath)) {
                yield this.saveAttributes(requestEnvelope, {});
                return this.getUserAttributes();
            }
            return yield new Promise((res) => {
                fs.readFile(this.filePath, 'utf8', (err, data) => {
                    if (err) {
                        throw new Error(`Unable to access file ${this.filePath}.`);
                    }
                    this.attributes = JSON.parse(data);
                    res(this.getUserAttributes());
                });
            });
        }))();
    }
    saveAttributes(requestEnvelope, attributes) {
        this.setUserByRequest(requestEnvelope);
        this.setUserAttributes(attributes);
        return this.writeFile(JSON.stringify(this.attributes));
    }
    deleteAttributes(requestEnvelope) {
        this.setUserByRequest(requestEnvelope);
        return this.saveAttributes(requestEnvelope, {});
    }
    getUserAttributes() {
        if (this.attributes === void 0) {
            return void 0;
        }
        return this.separateFilesByUser ?
            this.attributes :
            this.attributes[this.userId];
    }
    setUserAttributes(attributes) {
        if (this.separateFilesByUser) {
            this.attributes = attributes;
        }
        else {
            if (this.attributes === void 0) {
                this.attributes = {};
            }
            this.attributes[this.userId] = attributes;
        }
    }
    writeFile(data) {
        return new Promise((res) => {
            fs.writeFile(this.filePath, data, { flag: 'w' }, (err) => {
                if (err) {
                    throw err;
                }
                res();
            });
        });
    }
    setUserByRequest(requestEnvelope) {
        if (this.userId !== void 0) {
            return;
        }
        this.userId = requestEnvelope.session.user.userId;
        this.filePath = this.separateFilesByUser ? this.path + this.userId + ".json" : this.path;
    }
}
exports.FileSystemPersistenceAdapter = FileSystemPersistenceAdapter;
