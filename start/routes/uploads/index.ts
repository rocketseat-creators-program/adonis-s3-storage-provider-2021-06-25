import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get(':file', 'Main.show').as('getFile')
}).namespace('App/Controllers/Http/Users/Uploads')
  .as('files')
  .prefix('uploads')