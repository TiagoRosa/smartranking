import { Injectable,Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criaJogadoDto:CriarJogadorDto):Promise<void>{
        const {email} = criaJogadoDto;

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrado){
            this.atualizar(jogadorEncontrado,criaJogadoDto)
        }else{
            this.criar(criaJogadoDto);
        };                
    }

    async consultarTodosJogadores():Promise<Jogador[]>{
        return this.jogadores;
    }

    async consultaJogadorPeloEmail(email: string):Promise<Jogador>{
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o e-mail ${email} não encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<void>{

        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o e-mail ${email} não encontrado`);
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)
    }

    private criar(criaJogadoDto: CriarJogadorDto):void{

        const {nome, email, telefoneCelular} = criaJogadoDto;

        // const jogador: Jogador = {
        //     _id: uuidv4(),
        //     nome,
        //     telefoneCelular,
        //     email,
        //     ranking: 'A',
        //     posicaoRanking: 1,
        //     urlFotoJogador: 'www.google.com.br/foto123.jpg'
        // };

        // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)

        // this.jogadores.push(jogador);

    }

    private atualizar(jogadorEncontrado: Jogador, criaJogadoDto: CriarJogadorDto):void {    
        const {nome} = criaJogadoDto;
        
        jogadorEncontrado.nome = nome;

    }



}
