import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Desafio extends Document{

    dataHoraDesafio: Date
    status: String // mudar para o Enum
    dataHoraSolicitacao: Date
    dataHoraResposta: Date
    solicitante: Jogador
    categoria: string
    jogadores: Array<Jogador>
    partida: Partida
}

export interface Partida extends Document{

    categoria:string
    jogadores: Array<Jogador>
    def: Jogador
    resultado: Array<Resultado>

}

export interface Resultado{
    set: string
}