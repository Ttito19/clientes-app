import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
@Component({
	selector: 'detalle-cliente',
	templateUrl: './detalle.component.html',
	styleUrls: [ './detalle.component.css' ]
})
export class DetalleComponent implements OnInit {
	@Input() cliente: Cliente;
	titulo: string = 'Detalle del cliente';
	//atributo propio de la clase
	private ImagenSeleccionada: File;
	progreso: number = 0;
	constructor(private clienteService: ClienteService, private modalService: ModalService) {}

	ngOnInit() {
		// this.activatedRoute.paramMap.subscribe((params) => {
		// 	let id: number = +params.get('id');
		// 	if (id) {
		// 		this.clienteService.getCliente(id).subscribe((cliente) => {
		// 			this.cliente = cliente;
		// 		});
		// 	}
		// });
	}
	//método en onchage
	seleccionarFoto(event) {
		this.ImagenSeleccionada = event.target.files[0];
		this.progreso = 0;
		// console.log(this.ImagenSeleccionada);
		//this.ImagenSeleccionada.type.indexOf('image') para verificar si es una imagen
		if (this.ImagenSeleccionada.type.indexOf('image') < 0) {
			swal.fire('Error seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error');
			this.ImagenSeleccionada = null;
		}
	}
	//método en onclick
	UploadFoto() {
		if (!this.ImagenSeleccionada) {
			swal.fire('Error al subir ', ' seleccionar una foto', 'error');
		} else {
			this.clienteService.subirFoto(this.ImagenSeleccionada, this.cliente.id).subscribe((event) => {
				if (event.type === HttpEventType.UploadProgress) {
					this.progreso = Math.round(event.loaded / event.total * 100);
					// console.log(this.progreso);

					console.log(this.clienteService);
				} else if (event.type === HttpEventType.Response) {
					let response: any = event.body;
					this.cliente = response.cliente as Cliente;
					//actualizar la foto al agregar en el listado
					this.modalService.notificarSubida.emit(this.cliente);
					swal.fire(
						'La foto se ha subido completamente!',
						`La foto se ha subido con éxito: ${this.cliente.foto}`,
						'success'
					);
				}
			});
		}
	}
	closeModal() {
		this.modalService.closeModal();
		this.ImagenSeleccionada = null;
		this.progreso = 0;
	}
}
