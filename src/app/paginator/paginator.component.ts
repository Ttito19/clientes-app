import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'paginator-nav',
	templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {
	@Input() paginador: any;
	paginas: number[];
	desde: number;
	hasta: number;
	constructor() {}
	//ngOnInit se ejecuta una vez
	ngOnInit() {
		this.initPaginator();
	}
	ngOnChanges(changes: SimpleChanges) {
		let paginadorActualizado = changes['paginador'];
		//si paginador actualizaddo tiene alguna version anterior
		if(paginadorActualizado.currentValue){
			this.initPaginator();
		}
	}
	private initPaginator(): void {
		//(el maximo entre 1 y pagina actual -4), el total de pagina -5
		this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
		//(el minimo entre el total de paginas, y la pagina actual +4), segundo valor a compprar 6
		this.hasta = Math.max(Math.min(this.paginador.totalPages, this.paginador.number + 4), 6);
		if (this.paginador.totalPages > 5) {
			this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
		} else {
			this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
			console.log(this.paginas); //array 3
			console.log(this.paginador.totalPages); //solo 3
		}
	}
}
