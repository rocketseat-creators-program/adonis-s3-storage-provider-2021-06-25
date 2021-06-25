import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

import File from './File'
import User from './User'

export default class Certificate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'certificate' })
  })
  public file: HasOne<typeof File>

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user: BelongsTo<typeof User>
}
