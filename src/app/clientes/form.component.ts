import { Component, OnInit } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  // styleUrls: [ './form.component.css' ]
})
export class FormComponent implements OnInit {
  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear cliente";
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
      let id = params["id"];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }
  //crear cliente
  public create(): void {
    //me trae el valor del input
    console.log(this.cliente);
    //llamo a create de cliente service
    this.clienteService.create(this.cliente).subscribe(
      ///redireccion a clientes
      (cliente) => {
		this.router.navigate(["/clientes"]);
		// libreria de alerta
        swal.fire(
          "Nuevo cliente",
          `Cliente ${cliente.nombre} creado con éxito`,
          "success"
        );
      }
    );
  }
}
