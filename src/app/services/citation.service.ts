import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { json2xml } from 'xml-js';
import * as vkbeautify from 'vkbeautify';
import { getRepository } from 'typeorm';

import { Citation, Violation } from '../entity';
import { Attachment } from '../entity/Attachment';
import { Platform } from '@ionic/angular';


const citationFieldIds = {
  'issue_date': 'IssueDate',
  'issue_time': 'IssueTime',
  'officer_id': 'OfficerID',
  'meter_no': 'MeterNo',
  'vehicle_license': 'VehLicense',
  'vehicle_state': 'VehState',
  'vehicle_make': 'VehMake',
  'vehicle_color': 'VehColor',
  'vehicle_vin': 'VIN',
  'expiration_date': 'ExpDate',
  'plate_color': 'PlateColor',
  'plate_type': 'PlateType',
  'location': 'Location',
  'remarks': 'Remarks',
};


@Injectable({
  providedIn: 'root'
})
export class CitationService {
  fileTransfer: FileTransferObject;
  readonly entityName = 'citation';

  constructor(private file: File, private transfer: FileTransfer, private platform: Platform) {

    this.platform.ready().then(() => {
      this.fileTransfer = this.transfer.create();
    });
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
      citation.timestamp = String(Date.now());
    }

    //TODO: remove when typeorm-eager is fixed.
    citation.attachments = await this.getRepository('attachment').find({ citation: citation }) as Attachment[];
    citation.violations = await this.getRepository('violation').find({ citation: citation }) as Violation[];

    return citation;
  }

  /**
   * submit citation
   * 
   * @param citation 
   */
  async submitCitation(citation: Citation): Promise<any> {

    const xmlCitation = this.getXmlCitation(citation);
    if (xmlCitation) {

      const newFile = await this.writeXML(xmlCitation);
      if (newFile) {

        const filePath = `${this.platform.is('ios') ? this.file.dataDirectory : ''}` + newFile.fullPath;

        console.log('New file', newFile);
        return await this.uploadFile(filePath, 'http://216.83.136.41/Velosum/AlfWebListener/default.aspx');

      }
    }
  }

  /**
   * Convert citation to XML string
   */
  getXmlCitation(citation: Citation): string {
    const xmlObj = {};
    xmlObj['declaration'] = {
      attributes: {
        version: '1.0',
        encoding: 'utf-8'
      }
    };

    citation = Object.assign({}, citation);

    delete citation['id'];

    const elements = [];
    for (let key in citation) {
      const ele = {};
      ele['type'] = 'element';
      ele['name'] = key;

      // attachments
      if (key === 'attachments') {

        const attachEls = [];
        for (let attachment of citation[key]) {
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

        // violations
      } else if (key === 'violations') {
        const violationEls = [];
        for (let violation of citation[key]) {
          violationEls.push({
            type: 'element',
            name: 'violation',
            attributes: {
              violation_id: violation.violation_id,
            }
          });
        }

        if (violationEls.length) {
          ele['elements'] = violationEls;
        }
      } else if (['vehicle_state', 'vehicle_color', 'vehicle_make'].includes(key)) {

        ele['elements'] = [{
          type: 'text',
          text: citation[key]['abbreviation']
        }];

      } else {
        ele['elements'] = [{
          type: 'text',
          text: citation[key]
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

      return vkbeautify.xml(json2xml(JSON.stringify(xmlObj)));

    } catch (e) {

      return null;

    }
  }

  private writeXML(xml: string, fileName?: string): Promise<any> {
    fileName = fileName || `citation-${Date.now()}.xml`;

    return this.file.writeFile(this.file.dataDirectory, fileName, xml);
  }

  private uploadFile(filePath: string, url: string, options?: any/*FileUploadOptions*/): Promise<FileUploadResult> {

    return this.fileTransfer.upload(filePath, url, options);
  }
}
