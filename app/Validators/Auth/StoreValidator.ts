import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
	constructor(protected ctx: HttpContextContract) {
	}
	public schema = schema.create({
		email: schema.string({ trim: true, escape: true }),
		password: schema.string({ trim: true, escape: true })
	})

	public messages = {}
}
