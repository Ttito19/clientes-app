import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	modal: boolean = false;
	//any significa cualquier tipo de dato
	//en typscript para diferenciar de su metodo getter ponerle un guion bajo
	private _notificarSubida = new EventEmitter<any>();
	constructor() {}

	get notificarSubida(): EventEmitter<any> {
		return this._notificarSubida;
	}

	openModal() {
		this.modal = true;
	}

	closeModal() {
		this.modal = false;
	}
}
