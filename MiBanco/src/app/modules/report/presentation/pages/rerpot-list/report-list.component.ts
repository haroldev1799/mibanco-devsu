import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from "@app/shared/components/organisms/table/table.component";
import { MenuComponent } from "@app/shared/components/atoms/menu/menu.component";
import { ButtonComponent } from "@app/shared/components/atoms/button/button.component";
import { ReportRepository } from '@app/modules/report/domain/repository/report.repository';
import { Router } from '@angular/router';
import { optionsMenu } from '@app/core/dictionaries/options/options.value';
import { ButtonType } from '@app/shared/components/atoms/button/button.interface';
import { COLUMNS_REPORT_LIST, FILTER_FORM, MESSAGES } from './report-list.component.constants';
import { ReportResponse, Reports } from '@app/modules/report/domain/dto/report.dto';
import { ButtonData } from '../../../../../shared/components/atoms/button/button.interface';
import { SelectComponent } from "@app/shared/components/atoms/select/select.component";
import { IOptionSelect } from '@app/shared/components/atoms/select/select.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ClientRepository } from '@app/modules/client/domain/repository/client.repository';
import { AccountRepository } from '@app/modules/account/domain/repository/account.repository';
import { DatePickerComponent } from "@app/shared/components/atoms/date-picker/date-picker.component";


@Component({
  selector: 'app-report-list',
  imports: [TableComponent, ButtonComponent, SelectComponent, DatePickerComponent],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.sass'
})
export class ReportListComponent {

	private reportRepository = inject(ReportRepository);
	private clientRepository = inject(ClientRepository);
	private accountRepository = inject(AccountRepository);
	private fb = inject(FormBuilder);
  readonly FILTER_FORM = FILTER_FORM;

  dataSource:Reports[] = [];

  columns = COLUMNS_REPORT_LIST;
  options = Object.values(optionsMenu);

  buttonType = ButtonType;
  message = MESSAGES;

  formGroup!: FormGroup;
  btnData: ButtonData = {
    img: 'download.svg',
    style: {
      width: '25px'
    }
  };

  optionsClient: IOptionSelect[] = [];
  optionsAccount: IOptionSelect[] = [];


  ngOnInit(): void {
    const reports = this.reportRepository.getAll();
    const clients = this.clientRepository.getAll();
    const accounts = this.accountRepository.getAll();

    forkJoin([reports, clients, accounts]).subscribe({
      next: ([re, cl, ac]) => {
        this.dataSource = [...re.data];
        this.optionsClient = cl.data.map( s => ({name : s.name, value: s.id}));
        this.optionsAccount = ac.data.map( s => ({name : s.account_number, value: s.id.toString()}));
      },
      error: (err) => console.error('Error en forkJoin', err)
    });
    this.reportRepository.getAll().subscribe({
      next:(result: ReportResponse) => {
        this.dataSource = [...result.data];
      },
    });
    this.formGroup = this.fb.group({
			[FILTER_FORM.client_id]: [null],
			[FILTER_FORM.account_id]: [null],
			[FILTER_FORM.date]: [null],
		});
  }

  download(movementId?: number){
    const filter = this.formGroup.getRawValue();
    this.reportRepository.generateReport(filter.client_id, filter.account_id, filter.date, movementId).subscribe({
      next: (result: Blob) => {
        const url = window.URL.createObjectURL(result);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf';
        a.click();

        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar reporte', err);
      }
    });
  }

  cleanFilter(){
    this.formGroup.reset();
    this.formGroup.updateValueAndValidity();
    this.reportRepository.getAll().subscribe({
      next:(result: ReportResponse) => {
        this.dataSource = [...result.data];
      },
    });
  }

  search(){
    const filter = this.formGroup.getRawValue();
    this.reportRepository.getAll(filter.client_id, filter.account_id, filter.date).subscribe({
      next:(result: ReportResponse) => {
        this.dataSource = [...result.data];
      },
    });
  }

}
