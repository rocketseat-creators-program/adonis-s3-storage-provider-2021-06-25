export interface IStorageProvider {
  saveFile(file: ISaveFileDTO): Promise<void>;
  deleteFile(fileName: string): Promise<void>;
  getFileSignature(fileName: string): string;
}

export type ISaveFileDTO = {
  fileBuffer: Buffer,
  fileName: string,
  fileType?: string,
  fileSubType?: string,
  isPublic?: boolean
}