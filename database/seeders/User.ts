import { User } from 'App/Models'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      email: 'marcos@gmail.com',
      password: '123456'
    })
  }
}
