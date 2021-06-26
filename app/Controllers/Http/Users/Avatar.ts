import sharp from 'sharp'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import StorageProvider from '@ioc:ExpertsClub/StorageProvider'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreValidator } from 'App/Validators/User/Avatar'
import { ISaveFileDTO } from 'Contracts/interfaces/IStorageProvider'

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

      const fileBuffer = await sharp(file.tmpPath).resize(150, 150, {
        fit: 'cover',
        position: 'center'
      }).toBuffer()

      const fileSave: ISaveFileDTO = {
        fileBuffer,
        fileName: avatar.fileName,
        fileType: file.type,
        fileSubType: file.subtype,
        isPublic: true
      }

      await StorageProvider.saveFile(fileSave)

      if (avatarIsExists)
        StorageProvider.deleteFile(avatarIsExists.fileName)

      return avatar
    })

    return response.serialize({
      fields: { pick: ['url'] }
    })
  }
}
