import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import StorageProvider from '@ioc:ExpertsClub/StorageProvider'

import { FileCategory } from 'App/Utils'
import uploadConfig from 'Config/upload'

export default class File extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public fileCategory: FileCategory

  @column({ serializeAs: null })
  public fileName: string

  @column({ serializeAs: null })
  public isPublic: boolean

  @column({ serializeAs: null })
  public ownerId: number

  @computed()
  public get url(): string | null {
    if (!this.fileName) {
      return null;
    }

    if (uploadConfig.driver === 'disk')
      return `${uploadConfig.config.disk.url}/${uploadConfig.config.disk.folder}/${this.fileName}`

    if (this.isPublic)
      return `https://${uploadConfig.config.aws.bucket}.s3-${uploadConfig.config.aws.region}.amazonaws.com/${this.fileName}`

    return StorageProvider.getFileSignature(this.fileName)
  }
}
