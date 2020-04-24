import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
///import localeEs from '@angular/common/locales/es';
// import localeEs from '@angular/common/locales/es-PE';
// import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class ClienteService {
	private urlEndPoint: string = 'http://localhost:8080/api/clientes';
	private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
	constructor(private http: HttpClient, private router: Router) {}

	//metodo getClientes que retorna los CLIENTES
	getClientes(page: number): Observable<any> {
		return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
			//pipe permite agregar operador como el map
			tap((response: any) => {
				// console.log('ClienteService: tap 1');
				(response.content as Cliente[]).forEach((cliente) => console.log('cliente.nombre'));
			}),
			map((response: any) => {
				(response.content as Cliente[]).map((cliente) => {
					//convertir el nombre en mayuscula
					cliente.nombre = cliente.nombre.toUpperCase();
					//PONER DIA, MES,AÑO EN ESPAÑOL
					//let datePipe = new DatePipe('es');
					//1-cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
					//2-cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'es');
					return cliente;
				});
				return response;
			}),
			tap((response) => {
				// console.log('ClienteService: tap 2');
				(response.content as Cliente[]).forEach((cliente) => console.log('cliente.nombre'));
			})
		);
	}

	//método para crear cliente
	create(cliente: Cliente): Observable<Cliente> {
		return this.http
			.post(this.urlEndPoint, cliente, {
				headers: this.httpHeaders
			})
			.pipe(
				map((response: any) => response.cliente as Cliente),
				catchError((e) => {
					if (e.status == 400) {
						return throwError(e);
					}
					console.error(e.error.mensaje);
					swal.fire(e.error.mensaje, e.error.error, 'error');
					return throwError(e);
				})
			);
	}
	//método para obtener la informacion del cliente por id
	getCliente(id): Observable<Cliente> {
		return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
			catchError((e) => {
				this.router.navigate([ '/clientes' ]);
				swal.fire('Error al editar', e.error.mensaje, 'error');
				console.error(e.error.mensaje);
				return throwError(e);
			})
		);
	}
	//método para actualizar
	update(cliente: Cliente): Observable<any> {
		return this.http
			.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
				headers: this.httpHeaders
			})
			.pipe(
				catchError((e) => {
					if (e.status == 400) {
						return throwError(e);
					}
					console.error(e.error.mensaje);
					swal.fire(e.error.mensaje, e.error.error, 'error');
					return throwError(e);
				})
			);
	}
	//método para eliminar
	delete(id: number): Observable<Cliente> {
		return this.http
			.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
				headers: this.httpHeaders
			})
			.pipe(
				catchError((e) => {
					console.error(e.error.mensaje);
					swal.fire(e.error.mensaje, e.error.error, 'error');
					return throwError(e);
				})
			);
	}
}
