import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'nestjs-soap';
import { UploadDocOptions } from '../types/upload-doc-options.type';
import { CheckStatus } from 'src/types/check-status.type';

@Injectable()
export class AntiplagiatService {
    constructor(@Inject('SOAP_CLIENT') private readonly client: Client) {}

    async uploadWork(options: UploadDocOptions): Promise<number> {
        const res = await this.client.UploadDocumentAsync(options);
        const uploaded = res[0].UploadDocumentResult.Uploaded[0];
        return uploaded.Id.Id;

        // {
        //     Uploaded: [ { Id: [Object], FileName: 'work.docx', Reason: 'NoError' } ]
        // }
    }

    async checkWork(id: number) {
        try {
            await this.client.CheckDocumentAsync({
                docId: { Id: id },
            });
            return { id };
        } catch (error) {
            const fault = error.root.Envelope.Body.Fault;
            console.log(fault.faultstring.$value);
        }
    }

    async checkStatusWork(id: number): Promise<CheckStatus> {
        const res = await this.client.GetCheckStatusAsync({
            docId: { Id: id },
        });
        const status = res[0].GetCheckStatusResult;
        return status as CheckStatus;
    }
}
