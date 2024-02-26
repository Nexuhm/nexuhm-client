import { client } from './clients/browser-client';

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

  static updateCareersPage(companyId: string, fields: Record<string, any>) {
    return client.put(`/admin/company/${companyId}/careers-page`, fields);
  }
}
