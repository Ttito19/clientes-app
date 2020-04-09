import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class ClienteService {
	private urlEndPoint: string = 'http://localhost:8080/api/clientes';
	private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
	constructor(private http: HttpClient) {}
	//metodo getClientes que retorna los CLIENTES
	getClientes(): Observable<Cliente[]> {
		//pipe permite agregar operador como el map
		return this.http.get(this.urlEndPoint).pipe(map((response) => response as Cliente[]));
	}
	//método para crear cliente
	create(cliente: Cliente): Observable<Cliente> {
		return this.http.post<Cliente>(this.urlEndPoint, cliente, {
			headers: this.httpHeaders
		});
	}
	//método para obtener la informacion del cliente por id
	getCliente(id): Observable<Cliente> {
		return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
	}
	//método para actualizar
	update(cliente: Cliente): Observable<Cliente> {
		return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
			headers: this.httpHeaders
		});
	}
	//método para eliminar
	delete(id: number): Observable<Cliente> {
		return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
			headers: this.httpHeaders
		});
	}
}
