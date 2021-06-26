import fs from 'fs'
import Application from '@ioc:Adonis/Core/Application';

import upload from 'Config/upload';
import { ISaveFileDTO, IStorageProvider } from "Contracts/interfaces/IStorageProvider"

class DiskStorageProvider implements IStorageProvider {
  private folder: string

  constructor() {
    this.folder = Application.tmpPath(upload.config.disk.folder)
  }

  public async saveFile({ fileBuffer, fileName }: ISaveFileDTO): Promise<void> {
    await fs.promises.writeFile(`${this.folder}/${fileName}`, fileBuffer)
  }

  public async deleteFile(fileName: string): Promise<void> {
    await fs.promises.unlink(`${this.folder}/${fileName}`)
  }

  public getFileSignature(fileName: string): string {
    return `${upload.config.disk.url}/${this.folder}/${fileName}`
  }
}

export default DiskStorageProvider