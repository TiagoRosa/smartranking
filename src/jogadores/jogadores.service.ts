import { BadRequestException, Injectable,Logger, NotFoundException } from '@nestjs/common';
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

    async criarJogador(criaJogadoDto:CriarJogadorDto):Promise<Jogador>{
        const {email} = criaJogadoDto;

        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        
        if (jogadorEncontrado){
            throw new BadRequestException(`Jogador com o e-mail ${email} já cadastrado`)
        }
        
        const jogadorCriado = new this.jogadorModel(criaJogadoDto);
        return await jogadorCriado.save();
        
    }

    async atualizarJogador(_id:string, criaJogadoDto:CriarJogadorDto):Promise<void>{
        
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(!jogadorEncontrado){
            throw new NotFoundException(`O Jogador não foi encontrado`)
        }

        await this.jogadorModel.findOneAndUpdate(
            {_id},
            {$set: criaJogadoDto}
        ).exec();
        
        
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

    async consultaJogadorPeloId(_id: string):Promise<Jogador>{
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador não encontrado`);
        }
        return jogadorEncontrado;
    }

    async deletarJogador(_id: string): Promise<any>{

        return await this.jogadorModel.deleteOne({_id}).exec();
    }
}
