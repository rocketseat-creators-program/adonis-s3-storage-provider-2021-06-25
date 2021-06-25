import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'

export default class MainsController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '10days',
      })

      const user = token.user

      await user.load('avatar')

      return { ...token.toJSON(), user }
    } catch (error) {
      return response.badRequest('Invalid credentials')
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('api').logout()
    return response.status(200)
  }
}
