import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MainsController {
  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }
}
