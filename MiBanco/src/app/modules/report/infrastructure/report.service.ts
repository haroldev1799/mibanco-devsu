import { inject, signal } from '@angular/core';
import { ReportRepository } from '../domain/repository/report.repository';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '@app/core/config/url';
import { Observable } from 'rxjs';
import { ReportResponse } from '../domain/dto/report.dto';

export class ReportRepositoryService extends ReportRepository  {

  private readonly http = inject(HttpClient);
  protected url = `${URL_BACKEND}Reporte/`;

  getAll(): Observable<ReportResponse> {
	return this.http.get<ReportResponse>(`${this.url}GetAll`);
  }

  generateReport(id: string): Observable<Blob> {
    return this.http.post(`${this.url}GenerarReporte?id=${id}`, {}, {
        responseType: 'blob'
    });
  }

}
