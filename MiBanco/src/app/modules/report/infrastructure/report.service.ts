import { inject, signal } from '@angular/core';
import { ReportRepository } from '../domain/repository/report.repository';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '@app/core/config/url';
import { Observable } from 'rxjs';
import { ReportResponse } from '../domain/dto/report.dto';

export class ReportRepositoryService extends ReportRepository  {

  private readonly http = inject(HttpClient);
  protected url = `${URL_BACKEND}Reporte/`;

  getAll(clientId?: string, accountId?: string, date?: string): Observable<ReportResponse> {
	return this.http.get<ReportResponse>(`${this.url}GetAll?clientId=${clientId}&accountId=${accountId}&date=${date}`);
  }

  generateReport(clientId?: string, accountId?: string, date?: string, movementId?: number): Observable<Blob> {
    return this.http.post(`${this.url}GenerarReporte?clientId=${clientId}&accountId=${accountId}&date=${date}&movementId=${movementId}`, {}, {
        responseType: 'blob'
    });
  }

}
