import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
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

    return this.fileName
  }
}
