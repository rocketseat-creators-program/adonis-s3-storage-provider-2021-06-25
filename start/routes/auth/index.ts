import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('login', 'Main.store').as('login')
  Route.delete('logout', 'Main.destroy').middleware('auth').as('logout')
}).namespace('App/Controllers/Http/Auth')
  .as('auth')
  .prefix('api/v1/auth')