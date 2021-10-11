import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'


export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
	return {
		uri: getMongoString(configService)
	}
}

const getMongoString = (configService: ConfigService): string => {
	return `mongodb://${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/courses`
}