import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception/entity-not-found-exception.filter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new EntityNotFoundExceptionFilter());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, () => {
        console.log(`Server started on port = ${PORT}`);
    });
}

bootstrap();
