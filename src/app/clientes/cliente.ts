import {Region} from './region';

//atributos
export class Cliente {
	id: number;
	nombre: string;
	apellido: string;
	createAt: string;
	email: string;
	foto: string;
	//region del tipo region y por eso se importa
	region:Region

}
