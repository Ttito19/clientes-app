import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-clientes',
	templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
	//arreglo json con los objetos
	clientes: Cliente[];
	paginador: any;
	constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {}
	//este evento es cuando se inicia el componente
	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((params) => {
			let page: number = +params.get('page');
			if (!page) {
				page = 0;
			}
			this.clienteService
				.getClientes(page)
				.pipe(
					tap((response) => {
						// console.log('CLAIENTTE:TAP 3');
						(response.content as Cliente[]).forEach((cliente) => console.log("cliente.nombre"));
						// console.log(response);
					})
				)
				.subscribe((response) => {
					this.clientes = response.content as Cliente[];
					this.paginador = response;
					// console.log(this.clientes);
				});
		});
	}
	//metodo para eliminar
	delete(cliente: Cliente): void {
		Swal.fire({
			title: '¿Está seguro?',
			text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido} `,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!'
		}).then((result) => {
			if (result.value) {
				this.clienteService.delete(cliente.id).subscribe((response) => {
					//quitar de la lista al cliente eliminado
					this.clientes = this.clientes.filter((cli) => cli !== cliente);
					//libreria de alerta
					Swal.fire('Cliente eliminado!', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
				});
			} else {
				Swal.fire('Cancelado!', `Cliente no eliminado`, 'success');
			}
		});
	}
}
