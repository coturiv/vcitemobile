import { Injectable } from '@angular/core';
import { Citation } from '../entity';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { json2xml } from 'xml-js';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  readonly fileTransfer: FileTransferObject;

  constructor(private file: File, private transfer: FileTransfer) {
    
    this.fileTransfer = this.transfer.create();
  }

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

  private uploadFile(filePath: string, url: string, options: FileUploadOptions): Promise<FileUploadResult> {
    
    return this.fileTransfer.upload(filePath, url, options);
  }
}
