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
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    async findAll(
        @Query() optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<CourseEntity>> {
        return await this.courseService.findAllPaginated(optionsDTO);
    }

    @Get(':id')
    async findById(@Param('id') id: number) {
        return await this.courseService.findByIdOrFail(id);
    }

    @Post()
    async create(@Body() dto: CreateCourseDTO) {
        return await (this.courseService as CourseService).createCourse(dto);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateCourseDTO) {
        return await (this.courseService as CourseService).updateCourse(
            id,
            dto,
        );
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await (this.courseService as CourseService).deleteCourse(id);
    }
}
