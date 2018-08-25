import { Component, OnInit, Inject } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';

@Component({
  selector: 'app-transfer-back',
  templateUrl: './transfer-back.component.html'
})
export class TransferBackComponent implements OnInit {
  resultGet: any;
  resultPost: any;
  resultPut: any;
  resultPatch: any;
  resultDelete: any;

  constructor(private http: TransferHttpService,
    @Inject('ORIGIN_URL') public baseUrl: string) {
    console.log(`ORIGIN_URL=${baseUrl}`);
  }

  ngOnInit(): void {
    this.http.get('https://reqres.in/api/users?delay=3').subscribe(result => {
      this.resultGet = result;
    });

    this.http.post('https://reqres.in/api/users', {
      'name': 'morpheus',
      'job': 'leader'
    }).subscribe(result => {
      this.resultPost = result;
    });

    this.http.put('https://reqres.in/api/users/2', {
      'name': 'morpheus',
      'job': 'zion resident'
    }).subscribe(result => {
      this.resultPut = result;
    });

    this.http.patch('https://reqres.in/api/users/2', {
      'name': 'morpheus',
      'job': 'zion resident'
    }).subscribe(result => {
      this.resultPatch = result;
    });

    this.http.delete('https://reqres.in/api/users/2').subscribe(result => {
      this.resultDelete = result;
    });

    this.loadPost();
  }

  loadPost(): void {
    console.log('see network');
    const resultSub = this.http.post('https://reqres.in/api/users', JSON.stringify({
      'name': 'morpheus',
      'job': 'leader'
    })).subscribe(result => {
      this.resultPost = result;
      resultSub.unsubscribe();
    });
  }
}
