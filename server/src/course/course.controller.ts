import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { RequestManyDTO } from 'src/shared/crud/dto/request-many.dto';
import { ResponseManyDTO } from 'src/shared/crud/dto/response-many.dto';
import { CourseEntity } from './entities/course.entity';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    async findMany(
        @Query() optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<CourseEntity>> {
        return await this.courseService.findMany(optionsDTO);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.courseService.findByIdOrFail(id);
    }

    @Post()
    async createOne(@Body() dto: CreateCourseDTO) {
        return await this.courseService.createOne(dto);
    }

    @Post(':id')
    async updateOne(@Param('id') id: number, @Body() dto: UpdateCourseDTO) {
        return await this.courseService.updateOne(id, dto);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        return await this.courseService.deleteOne(id);
    }
}
