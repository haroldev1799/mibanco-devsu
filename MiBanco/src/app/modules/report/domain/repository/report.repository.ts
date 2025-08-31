import { Observable } from 'rxjs';
import { ReportResponse } from '../dto/report.dto';

export abstract class ReportRepository {
	
    abstract getAll(): Observable<ReportResponse>;
    abstract generateReport(id: string): Observable<Blob>;

}
