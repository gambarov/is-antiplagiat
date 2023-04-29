import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { PaginatedOptionsDTO } from 'src/shared/dto/paginated-meta-params.dto';
import { PaginatedDTO } from 'src/shared/dto/paginated.dto';
import { CourseEntity } from './course.entity';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    async findAll(
        @Query() optionsDTO: PaginatedOptionsDTO,
    ): Promise<PaginatedDTO<CourseEntity>> {
        return await this.courseService.findAllCourses(optionsDTO);
    }

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return await this.courseService.findOneCourseById(id);
    }

    @Post()
    async create(@Body() dto: CreateCourseDTO) {
        return await this.courseService.createCourse(dto);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateCourseDTO) {
        return await this.courseService.updateCourse(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.courseService.deleteCourse(id);
    }
}
