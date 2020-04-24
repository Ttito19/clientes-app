import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { IMPLICIT_REFERENCE } from '@angular/compiler/src/render3/view/util';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
///fecha en español en general
registerLocaleData(localeEs, 'es');
//arreglo de rutas del tipo Routes
//path: nombre de un ruta
//component:a donde lo va redireccionar
const routes: Routes = [
	{ path: '', redirectTo: '/clientes', pathMatch: 'full' },
	{ path: 'directivas', component: DirectivaComponent },
	{ path: 'clientes', component: ClientesComponent },
	{ path: 'clientes/page/:page', component: ClientesComponent },
	{ path: 'clientes/form', component: FormComponent },
	{ path: 'clientes/form/:id', component: FormComponent }
];
@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		DirectivaComponent,
		ClientesComponent,
		FormComponent,
		PaginatorComponent
	],
	imports: [ BrowserModule, HttpClientModule, RouterModule.forRoot(routes), FormsModule ],
	providers: [ ClienteService, { provide: LOCALE_ID, useValue: 'es' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
