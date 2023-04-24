import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { resolve, join, parse } from 'path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
    async uploadFile(file: Express.Multer.File): Promise<string> {
        try {
            const ext = parse(file.originalname).ext;
            const fileName = v4() + ext;
            const filePath = resolve(__dirname, '..', 'static');

            await ensureDir(filePath);

            await writeFile(join(filePath, fileName), file.buffer);

            return fileName;
        } catch (err) {
            console.log(err);
            throw new HttpException(
                'Произошла ошибка при сохрании файла',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
