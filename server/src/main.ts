import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { EntityNotFoundExceptionFilter } from './shared/filters/entity-not-found-exception.filter';
import {
    DocumentBuilder,
    SwaggerModule,
    SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const config = new DocumentBuilder()
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            // This name here is important for matching up with @ApiBearerAuth()
            'JWT-auth',
        )
        .addSecurityRequirements('JWT-auth')
        .setExternalDoc('Postman Collection', 'docs-json')
        .build();
    const options: SwaggerDocumentOptions = {
        operationIdFactory: (controllerKey: string, methodKey: string) =>
            methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(PORT, () => {
        console.log(`Server started on port = ${PORT}`);
    });
}

bootstrap();
