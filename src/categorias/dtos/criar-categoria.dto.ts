import {ArrayMinSize, IsArray, IsNotEmpty, IsString} from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';


// data transform object - responsavel apenas para trazer os campos que precisaremos pedir para o cliente.
export class CriarCategoriaDto {
    
    @IsString()
    @IsNotEmpty()
    readonly categoria: string;
    
    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}