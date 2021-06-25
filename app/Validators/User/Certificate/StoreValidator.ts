import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
	constructor(protected ctx: HttpContextContract) {
	}
	public schema = schema.create({
		file: schema.file({
			size: '5mb',
			extnames: ['jpg', 'png', 'jpeg', 'pdf']
		}),
		name: schema.string({ trim: true, escape: true })
	})
	public messages = {}
}
