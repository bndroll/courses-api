import { ConfigService } from '@nestjs/config'
import { ITelegramOptions } from 'src/telegram/telegram.interface'
import { TELEGRAM_TOKEN_NOT_FOUND } from '../telegram/telegram.constants'


export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_TOKEN')
	const chatId = configService.get('TELEGRAM_CHAT_ID')

	if (!token) throw new Error(TELEGRAM_TOKEN_NOT_FOUND)

	return {
		token,
		chatId
	}
}
