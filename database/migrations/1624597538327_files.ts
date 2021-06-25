import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Files extends BaseSchema {
  protected tableName = 'files'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('is_public').defaultTo(true)
      table.integer('owner_id').notNullable()
      table.string('file_category').notNullable()
      table.string('file_name').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
