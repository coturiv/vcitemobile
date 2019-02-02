import { Injectable } from '@angular/core';
import { Citation } from '../entity';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { json2xml } from 'xml-js';
import { getRepository } from 'typeorm';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  readonly fileTransfer: FileTransferObject;
  readonly entityName = 'citation';

  constructor(private file: File, private transfer: FileTransfer) {
    this.fileTransfer = this.transfer.create();
  }

  private get repository() {
    return getRepository(this.entityName);
  }

  /**
   * get citations
   */
  async getCitations() {
    return await this.repository.find() as Citation[];
  }

  /**
   * get citation by id
   */
  async getCitation(id: string) {
    return await this.repository.findOne(id) as Citation;
  }

  /**
   * submit citation
   * 
   * @param citation 
   */
  async submitCitation(citation: Citation): Promise<any> {
    const citationXml = this.objToXMLString(citation);
    if (citationXml) {

      await this.writeXML(citationXml);
      await this.uploadFile('', '', {});
    }
  }

  private objToXMLString(obj: Object): string | void {
    try {
      const jsonStr = JSON.stringify(obj);

      return json2xml(jsonStr);

    } catch (e) {

      return;

    }
  }

  private writeXML(xml: string, fileName?: string): Promise<any> {
    fileName = fileName || `citation-${Date.now()}.xml`;

    return this.file.writeFile(this.file.applicationStorageDirectory, fileName, xml);
  }

  private uploadFile(filePath: string, url: string, options: any/*FileUploadOptions*/): Promise<FileUploadResult> {
    
    return this.fileTransfer.upload(filePath, url, options);
  }
}
