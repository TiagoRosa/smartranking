// data transform object - responsavel apenas para trazer os campos que precisaremos pedir para o cliente.
export class CriarJogadorDto {
    readonly telefoneCelular: string;
    readonly email: string;
    readonly nome: string;
}