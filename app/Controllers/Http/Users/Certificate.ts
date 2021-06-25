import uploadConfig from 'Config/upload'
import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreValidator } from 'App/Validators/User/Certificate'
import Certificate from 'App/Models/Certificate'

export default class CertificatesController {
  public async index({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    await user.load('certificates')

    return user.certificates
  }

  public async store({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const { file, name } = await request.validate(StoreValidator)

      const user = await auth.authenticate()

      const certificate = new Certificate()
      certificate.useTransaction(trx)

      certificate.merge({ name, userId: user.id })
      await certificate.save()

      const fileCertificate = await certificate.related('file').create({
        fileCategory: 'certificate',
        fileName: `${cuid()}.${file.extname}`
      })

      const buffer = await fs.promises.readFile(file.tmpPath || '')

      await fs.promises.writeFile(
        `${Application.tmpPath(uploadConfig.config.disk.folder)}/${fileCertificate.fileName}`,
        buffer)

      return fileCertificate
    })

    return response.serialize({
      fields: { pick: ['url'] }
    })
  }
}
