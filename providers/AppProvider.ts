import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { DiskStorageProvider, S3StorageProvider } from 'App/Services/StorageProvider'
import upload from 'Config/upload'

export default class AppProvider {
  constructor(protected app: ApplicationContract) { }

  public register() {
    const storageProvider = upload.driver == 'disk' ? new DiskStorageProvider() :
      new S3StorageProvider

    this.app.container.singleton('ExpertsClub/StorageProvider', () => {
      return storageProvider
    })
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
