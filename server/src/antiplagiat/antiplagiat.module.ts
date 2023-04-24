import { Module } from '@nestjs/common';
import { AntiplagiatService } from './antiplagiat.service';
import { SoapModule } from 'nestjs-soap';

@Module({
    providers: [AntiplagiatService],
    exports: [AntiplagiatService],
    imports: [
        SoapModule.forRoot({
            clientName: 'SOAP_CLIENT',
            uri: 'https://api.antiplagiat.ru:4959/apiCorp/testapi?wsdl',
            auth: {
                type: 'basic',
                username: 'testapi@antiplagiat.ru',
                password: 'testapi',
            },
        }),
    ],
})
export class AntiplagiatModule {}
