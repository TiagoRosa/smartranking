import { Injectable,Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criaJogadoDto:CriarJogadorDto):Promise<void>{
        const {email} = criaJogadoDto;

        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado){
            this.atualizar(criaJogadoDto)
        }else{
            this.criar(criaJogadoDto);
        };                
    }

    async consultarTodosJogadores():Promise<Jogador[]>{
        return await this.jogadorModel.find().exec();
        //return this.jogadores;
    }

    async consultaJogadorPeloEmail(email: string):Promise<Jogador>{
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o e-mail ${email} não encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(email: string): Promise<any>{

        return await this.jogadorModel.remove({email}).exec();

        /*const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com o e-mail ${email} não encontrado`);
        }
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email)*/
    }

    private async criar(criaJogadoDto: CriarJogadorDto):Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(criaJogadoDto);
        return await jogadorCriado.save();

        /*

        const {nome, email, telefoneCelular} = criaJogadoDto;

         const jogador: Jogador = {
             _id: uuidv4(),
             nome,
             telefoneCelular,
             email,
             ranking: 'A',
             posicaoRanking: 1,
             urlFotoJogador: 'www.google.com.br/foto123.jpg'
         };

         // this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)

         this.jogadores.push(jogador);*/

    }

    private async atualizar(criaJogadoDto: CriarJogadorDto): Promise<Jogador> {    

        return await this.jogadorModel.findOneAndUpdate(
            {email: criaJogadoDto.email},
            {$set: criaJogadoDto}
        ).exec();

        /*const {nome} = criaJogadoDto;
        jogadorEncontrado.nome = nome;*/

    }



}
