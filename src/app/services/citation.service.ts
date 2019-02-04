import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { json2xml } from 'xml-js';
import { getRepository } from 'typeorm';

import { Citation } from '../entity';
import { Attachment } from '../entity/Attachment';


const citationFieldIds = {
  'issue_date'     : 'IssueDate',
  'issue_time'     : 'IssueTime',
  'officer_id'     : 'OfficerID',
  'meter_no'       : 'MeterNo',
  'vehicle_license': 'VehLicense',
  'vehicle_state'  : 'VehState',
  'vehicle_make'   : 'VehMake',
  'vehicle_color'  : 'VehColor',
  'vehicle_vin'    : 'VIN',
  'expiration_date': 'ExpDate',
  'plate_color'    : 'PlateColor',
  'plate_type'     : 'PlateType',
  'location'       : 'Location',
  'remarks'        : 'Remarks',
};


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  readonly fileTransfer: FileTransferObject;
  readonly entityName = 'citation';

  constructor(private file: File, private transfer: FileTransfer) {
    this.fileTransfer = this.transfer.create();
  }

  private getRepository(entityName: string = 'citation') {
    return getRepository(entityName);
  }

  /**
   * get citations
   */
  async getCitations() {
    return await this.getRepository().find() as Citation[];
  }

  /**
   * get citation by id
   */
  async getCitation(id: number) {
    let citation = await this.getRepository().findOne(id) as Citation;
    if (!citation) {
      citation = new Citation();
    }

    citation.attachments = await this.getRepository('attachment').find({citation_id: id}) as Attachment[];

    return citation;
  }

  /**
   * submit citation
   * 
   * @param citation 
   */
  async submitCitation(citation: Citation): Promise<any> {

    const xmlCitation = this.objToXMLString(citation);
    if (xmlCitation) {

      const fileCitation = await this.writeXML(xmlCitation);
      if (fileCitation) {

        try {

          const success = await this.uploadFile(fileCitation.fullPath, 'http://216.83.136.41/Velosum/AlfWebListener/default.aspx');
          await citation.remove();

          return success;

        } catch (e) {

          console.log(e);
          
          return;

        }
      }
    }
  }
  
  /**
   * Convert obj to XML string
   */
  private objToXMLString(obj: any): string | void {
    const xmlObj = {};
    xmlObj['declaration'] = {
      attributes: {
        version: '1.0',
        encoding: 'utf-8'
      }
    };

    obj = Object.assign({}, obj);

    delete obj['id'];
    
    const elements = [];
    for (let key in obj) {
      const ele = {};
      ele['type'] = 'element';
      ele['name'] = key;

      // TODO: Replace Recursion & Standard function
      if (key === 'attachments') {  // || 'violations'

        const attachEls = [];
        for (let attachment of obj['attachments']) {
          attachEls.push({
            type: 'element',
            name: 'attachment',
            elements: [{
              type: 'cdata',
              cdata: attachment.data
            }],
            attributes: {
              name: attachment.name,
              type: attachment.type,
            }
          });
        }

        if (attachEls.length) {
          ele['elements'] = attachEls;
        }

      } else {

        ele['elements'] = [{
          type: 'text',
          text: obj[key]
        }];
      }
      
      const fieldId = citationFieldIds[key];
      if (fieldId) {
        ele['attributes'] = {
          fieldId: fieldId
        }
      }

      elements.push(ele);
    }

    xmlObj['elements'] = [{
      type: 'element',
      name: 'citation',
      elements: elements
    }];

    try {
      return json2xml(JSON.stringify(xmlObj));

    } catch (e) {

      return;

    }
  }

  private writeXML(xml: string, fileName?: string): Promise<any> {
    fileName = fileName || `citation-${Date.now()}.xml`;

    return this.file.writeFile(this.file.applicationStorageDirectory, fileName, xml);
  }

  private uploadFile(filePath: string, url: string, options?: any/*FileUploadOptions*/): Promise<FileUploadResult> {
    
    return this.fileTransfer.upload(filePath, url, options);
  }
}
