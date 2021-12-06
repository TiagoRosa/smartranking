import {ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';


// data transform object - responsavel apenas para trazer os campos que precisaremos pedir para o cliente.
export class AtualizarCategoriaDto {
    
    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}