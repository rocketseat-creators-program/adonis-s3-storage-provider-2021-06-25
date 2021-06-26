import aws, { S3 } from 'aws-sdk'
import upload from 'Config/upload'

import { ISaveFileDTO, IStorageProvider } from "Contracts/interfaces/IStorageProvider"

class S3StorageProvider implements IStorageProvider {
  private client: S3
  private signedUrlExpireSeconds = 15
  private bucket = upload.config.aws.bucket

  constructor() {
    this.client = new aws.S3(({
      region: upload.config.aws.region
    }))
  }

  public async saveFile({
    fileBuffer,
    fileName,
    fileType,
    fileSubType,
    isPublic = true
  }: ISaveFileDTO): Promise<void> {
    const ACL = isPublic ? 'public-read' : 'private'

    const ContentType = `${fileType}/${fileSubType}`

    await this.client.upload({
      CacheControl: 'public,max-age=290304000',
      Key: fileName,
      Bucket: this.bucket,
      Body: fileBuffer,
      ACL,
      ContentType,
      ContentDisposition: 'inline'
    }).promise()
  }
  public async deleteFile(fileName: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: this.bucket,
      Key: fileName
    }).promise()
  }
  public getFileSignature(fileName: string): string {
    const url = this.client.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: fileName,
      Expires: this.signedUrlExpireSeconds
    })

    return url
  }

}

export default S3StorageProvider