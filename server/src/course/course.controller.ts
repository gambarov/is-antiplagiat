import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return await this.courseService.findOneById(id);
    }

    @Post('create')
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
