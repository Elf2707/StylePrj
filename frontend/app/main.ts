import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {AppComponent} from './app.component';

if(process.env.ENV === 'production'){
    enableProdMode();
}

//Boot app
bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);



