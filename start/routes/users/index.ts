import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'Main.show').as('getUser')
  Route.put('avatar', 'Avatar.update').as('setAvatarUser')

  Route.get('certificates', 'Certificate.index').as('getCertificate')
  Route.post('certificates', 'Certificate.store').as('saveCertificate')
}).namespace('App/Controllers/Http/Users')
  .as('users')
  .middleware('auth')
  .prefix('api/v1/users')