import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasOne,
  hasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'

import File from './File'
import Certificate from './Certificate'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'avatar' })
  })
  public avatar: HasOne<typeof File>

  @hasMany(() => Certificate, {
    foreignKey: 'userId',
    onQuery: (query) => query.preload('file')
  })
  public certificates: HasMany<typeof Certificate>
}
