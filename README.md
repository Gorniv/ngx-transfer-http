[![npm Downloads](https://img.shields.io/npm/dw/@gorniv/ngx-transfer-http.svg?style=flat-square)](https://www.npmjs.com/package/@gorniv/ngx-transfer-http)

deprecated, use https://github.com/Gorniv/ngx-universal
# ngx-transfer-http
Implementation http for Angular universal work based on TransferState

The package can be installed using:

`npm install @gorniv/ngx-transfer-http --save`

v1.1.2 is for use on Angular5

\>v1.1.2 are for use on Angular6

# TransferHttpModule

in `app.module.ts`

```ts
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    HttpClientModule, // must have this
    TransferHttpModule
    ...
```

# TransferHttpService

in `app.module.ts`

```ts
import { TransferHttpModule, TransferHttpService } from '@gorniv/ngx-transfer-http';

@NgModule({
  providers: [TransferHttpService],
  imports: [
   ...
})
```

use in component or service:

```ts
import { TransferHttpService } from '@gorniv/ngx-transfer-http';

...

constructor(private http: TransferHttpService){}

getData(): void{
    this.http.get<MyObjectModel>('https://reqres.in/api/users?delay=1').subscribe(result => {
      console.log(result);
      ...
    });

}

```

check:
1) Node server console
2) Open network in developer tools browser and your XHR network must be empty

![network chrome](./docs/imgs/check0.jpg)
