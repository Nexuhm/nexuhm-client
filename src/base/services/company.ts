import { client } from './clients/browser-client';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export interface SignUpPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export class CompanyService {
  static updateDetails(details: Record<string, string>) {
    return client.put('/company', details);
  }

  static getCareersPage(companyId: string) {
    return client.get(`/admin/company/${companyId}/careers-page`);
  }

  static updateCareersPage(companyId: string, fields: Record<string, any>) {
    return client.put(`/admin/company/${companyId}/careers-page`, fields);
  }
}
