import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { json2xml } from 'xml-js';
import * as vkbeautify from 'vkbeautify';
import { getRepository, Not, getManager, FindConditions, FindManyOptions } from 'typeorm';

import { Citation, Violation, Attachment, Location } from '../entities';
import { Platform } from '@ionic/angular';
import { StorageKeys, DefaultValues } from '../utility/constant';


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

  get currentId(): number {
    return Number(localStorage.getItem(StorageKeys.CURRENT_CITATION_ID));
  }

  set currentId(cId: number) {
    localStorage.setItem(StorageKeys.CURRENT_CITATION_ID, String(cId));
  }

  constructor(private file: File, private transfer: FileTransfer, private platform: Platform) {

    this.platform.ready().then(() => {
      this.fileTransfer = this.transfer.create();
    });
  }

  /**
   * get citations
   */
  async getCitations(isVisible = true) {
    const options: FindManyOptions = {
      order: {
        timestamp: 'DESC'
      }
    };

    if (isVisible) {
      options.where = {
        id: Not(DefaultValues.CITATION_DEFAULT_ID),
        // id: DefaultValues.CITATION_DEFAULT_ID,
        is_visible: true
      };
    } else {
      options.where = {
        id: Not(DefaultValues.CITATION_DEFAULT_ID),
        // id: DefaultValues.CITATION_DEFAULT_ID,
      };
    }
    return await getManager().find(Citation, options) as Citation[];
  }

  /**
   * get citation by id
   */
  async getCitation(id: number) {
    const citation = await getRepository(Citation).findOne(id) as Citation;

    if (citation) {
        // TODO: remove when typeorm-eager is fixed.
        citation.attachments = await getRepository(Attachment).find({ citation: citation }) as Attachment[];
        citation.violations = await getRepository(Violation).find({ citation: citation }) as Violation[];
    }

    return citation;
  }

  async getDefaultCitation() {
    return this.getCitation(DefaultValues.CITATION_DEFAULT_ID);
  }

  getCurrentCitation() {
    return this.getCitation(this.currentId);
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
        return await this.uploadFile(filePath, 'http://216.83.136.41/Velosum/AlfWebListener/default.aspx', {
          fileName: newFile.name,
          mimeType: 'application/xml'
        });

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
    for (const key of Object.keys(citation)) {
      const ele = {};
      ele['type'] = 'element';
      ele['name'] = key;

      // attachments
      if (key === 'attachments') {

        const attachEls = [];
        for (const attachment of citation[key]) {
          attachEls.push({
            type: 'element',
            Name: 'attachment',
            elements: [{
              type: 'cdata',
              cdata: attachment.data
            }],
            attributes: {
              Name: attachment.Name,
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
        for (const violation of citation[key]) {
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
          text: citation[key]['Abbreviation']
        }];

      } else if (key === 'location') {
        // ele['elements'] = [{
        //   type: 'text',
        //   text: `${citation[key]['street']}, ${citation[key]['unit']}`
        // }];
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
        };
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
