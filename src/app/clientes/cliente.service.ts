import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
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
	getClientes(): Observable<Cliente[]> {
		//pipe permite agregar operador como el map
		return this.http.get(this.urlEndPoint).pipe(map((response) => response as Cliente[]));
	}
	//método para crear cliente
	create(cliente: Cliente): Observable<Cliente> {
		return this.http
			.post(this.urlEndPoint, cliente, {
				headers: this.httpHeaders
			})
			.pipe(
				map((reponse: any) => reponse.cliente as Cliente),
				catchError((e) => {
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
