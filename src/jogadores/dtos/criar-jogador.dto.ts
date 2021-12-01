import {IsEmail, IsNotEmpty} from 'class-validator';


// data transform object - responsavel apenas para trazer os campos que precisaremos pedir para o cliente.
export class CriarJogadorDto {
    
    @IsNotEmpty()
    readonly telefoneCelular: string;
    
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly nome: string;
}