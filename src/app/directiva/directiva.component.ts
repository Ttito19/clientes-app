import { Component } from "@angular/core";

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html"
})
export class DirectivaComponent {
  //ARREGLO DE CURSOS
  listaCurso: string[] = ["TypeScript", "JavaScript", "Java SE", "C#", "PHP"];
  habilitar: boolean = true;
  constructor() {}

  setHabilitar(): void {
    //De este atributo habilitar de esta clase =que pueda ocultar la lista o mostrar
    this.habilitar = this.habilitar == true ? false : true;
  }
}
