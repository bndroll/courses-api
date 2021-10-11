import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { TopLevelCategory } from '../top-page.model'


export class HHDataDto {
	@IsNumber()
	count: number

	@IsNumber()
	juniorSalary: number

	@IsNumber()
	middleSalary: number

	@IsNumber()
	seniorSalary: number

	@IsString()
	updatedAt: Date
}

export class TopPageAdvantageDto {
	@IsString()
	title: string

	@IsString()
	description: string
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory

	@IsString()
	secondCategory: string

	@IsString()
	alias: string

	@IsString()
	title: string

	@IsString()
	metaTitle: string

	@IsString()
	metaDescription: string

	@IsString()
	category: string

	@IsOptional()
	@ValidateNested()
	@Type(() => HHDataDto)
	hh?: HHDataDto

	@IsArray()
	@IsOptional()
	@ValidateNested()
	@Type(() => TopPageAdvantageDto)
	advantages?: TopPageAdvantageDto[]

	@IsOptional()
	@IsString()
	seoText?: string

	@IsString()
	tagsTitle: string

	@IsArray()
	@IsString({each: true})
	tags: string[]
}
