import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html"
})
export class ClientesComponent implements OnInit {
  //arreglo json con los objetos
  clientes: Cliente[];
  constructor(private clienteService: ClienteService) {}
  //este evento es cuando se inicia el componente
  ngOnInit() {
    this.clienteService
      .getClientes()
      .subscribe(clientes => (this.clientes = clientes));
  }
}
