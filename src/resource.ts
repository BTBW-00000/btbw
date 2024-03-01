import type { api } from "misskey-js";
import type { DriveFile } from "misskey-js/autogen/models.d.ts";
import { StreamManager } from "./stream";


export class ResourceManager {
    client: api.APIClient;

    constructor(client: api.APIClient) {
        this.client = client;
    }

    async createFolderIfNotExists(folderName: string) {
        const responseExists = await this.client.request('drive/folders/find', {
            name: folderName,
            parent: null,
        });
        if (responseExists.length > 0) {
            console.debug(`${responseExists.length} folders found`);
            return responseExists[0].id;
        }

        const responseCreate = await this.client.request('drive/folders/create', {
            name: folderName,
            parent: null,
        });
        return responseCreate.id;
    }

    #uploadFile(sourceURL: string, folderId: string, comment?: string, isSensitive?: boolean, force?: boolean) {
        return new Promise<DriveFile>((resolve) => {
            const marker = crypto.randomUUID();

            const connection = StreamManager.use(this.client.origin, this.client.credential!).useChannel('main');
            connection.on('urlUploadFinished', response => {
                if (response.marker === marker) {
                    connection.dispose();
                    resolve(response.file);
                }
            });

            this.client.request('drive/files/upload-from-url', {
                url: sourceURL,
                folderId: folderId,
                isSensitive: isSensitive,
                comment: comment,
                force: force,
                marker: marker,
            });
        });
    }

    async uploadFileIfNotExists(fileName: string, folderId: string, sourceURL: string, comment?: string, isSensitive?: boolean, force?: boolean) {
        // 既存のファイル (同名が存在する可能性あり)
        {
            const response = await this.client.request('drive/files/find', {
                name: fileName,
                folderId: folderId,
            });

            if (response.length > 0) {
                console.debug(`${response.length} files found`);
                return response[0];
            }
        }

        // アップロードしたファイル
        {
            const file = await this.#uploadFile(sourceURL, folderId, comment, isSensitive, force);
            if (file.name == fileName) {
                return file;
            }

            // リネームして返す
            const response = await this.client.request('drive/files/update', {
                fileId: file.id,
                folderId: folderId,
                name: fileName,
                comment: comment,
                isSensitive: isSensitive,
            });
            return response;
        }
    }
}