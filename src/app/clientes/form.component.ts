import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
	selector: 'app-form',
	templateUrl: './form.component.html'
	// styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit {
	private cliente: Cliente = new Cliente();
	private titulo: string = 'Crear cliente';
	private errores: string[];
	constructor(
		private clienteService: ClienteService,
		private router: Router,
		private ActivatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.cargarCliente();
	}
	//listar por id
	cargarCliente(): void {
		this.ActivatedRoute.params.subscribe((params) => {
			let id = params['id'];
			if (id) {
				this.clienteService.getCliente(id).subscribe((cliente) => (this.cliente = cliente));
			}
		});
	}
	//crear cliente
	create(): void {
		//me trae el valor del input
		console.log(this.cliente);
		//llamo a create de cliente service
		this.clienteService.create(this.cliente).subscribe(
			///redireccion a clientes
			(cliente) => {
				this.router.navigate([ '/clientes' ]);
				// libreria de alerta
				swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito`, 'success');
			},
			(err) => {
				this.errores = err.error.errors as string[];
				// console.error('Código del error desde el backend ' + err.status);
				// console.error(err.error.errors);
				console.log(err);
				
			}
		);
	}
	update(): void {
		this.clienteService.update(this.cliente).subscribe(
			(json) => {
				this.router.navigate([ '/clientes' ]);
				// libreria de alerta
				swal.fire('Nuevo actualizado', `Cliente ${json.cliente.nombre} actualizado con éxito`, 'success');
			},
			(err) => {
				this.errores = err.error.errors as string[];
				console.error('Código del error desde el bbackend ' + err.status);
				console.error(err.error.errors);
			}
		);
	}
}
