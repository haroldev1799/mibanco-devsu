import { Observable } from 'rxjs';
import { ReportResponse } from '../dto/report.dto';

export abstract class ReportRepository {
	
    abstract getAll(clientId?: string, accountId?: string, date?: string): Observable<ReportResponse>;
    abstract generateReport(clientId?: string, accountId?: string, date?: string, movementId?: number): Observable<Blob>;

}
