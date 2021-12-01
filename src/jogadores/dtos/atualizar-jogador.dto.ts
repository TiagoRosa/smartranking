import {IsNotEmpty} from 'class-validator';


// data transform object - responsavel apenas para trazer os campos que precisaremos pedir para o cliente.
export class AtualizarJogadorDto {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsNotEmpty()
    readonly nome: string;
}