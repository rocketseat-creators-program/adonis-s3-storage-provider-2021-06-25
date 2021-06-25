import uploadConfig from 'Config/upload'
import fs from 'fs'
import sharp from 'sharp'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreValidator } from 'App/Validators/User/Avatar'

export default class UserAvatarController {
  public async update({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const { file } = await request.validate(StoreValidator)

      const user = await auth.authenticate()
      user.useTransaction(trx)

      const avatarIsExists = await user.related('avatar').query().first()

      const avatar = await user.related('avatar').updateOrCreate({}, {
        fileCategory: 'avatar',
        fileName: `${cuid()}.${file.extname}`
      })

      const resizedImageData = await sharp(file.tmpPath).resize(150, 150, {
        fit: 'cover',
        position: 'center'
      }).toBuffer()

      await fs.promises.writeFile(
        `${Application.tmpPath(uploadConfig.config.disk.folder)}/${avatar.fileName}`, resizedImageData)

      if (avatarIsExists)
        fs.promises.unlink(Application.tmpPath(uploadConfig.config.disk.folder, avatarIsExists.fileName))

      return avatar
    })

    return response.serialize({
      fields: { pick: ['url'] }
    })
  }
}
