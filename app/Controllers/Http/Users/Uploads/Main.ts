import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'

import uploadConfig from 'Config/upload';

export default class UsersUploadsMainController {
  public async show({ params, response }: HttpContextContract) {
    return response.download(Application.tmpPath(uploadConfig.config.disk.folder, params.file))
  }
}
