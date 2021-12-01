import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CriarJogadorDto} from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import {JogadoresValidacaoParametrosPipe} from './pipes/jogadores-validacao-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){

    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadoDto: CriarJogadorDto){
        await this.jogadoresService.criarJogador(criarJogadoDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(@Body() criarJogadoDto: CriarJogadorDto, 
        @Param('_id',JogadoresValidacaoParametrosPipe) _id:string): Promise<void>{
            await this.jogadoresService.atualizarJogador(_id,criarJogadoDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
            return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(@Param('_id', JogadoresValidacaoParametrosPipe) _id:string): Promise<Jogador>{
            return await this.jogadoresService.consultaJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(@Param('_id',JogadoresValidacaoParametrosPipe) _id:string):Promise<void>{
        await this.jogadoresService.deletarJogador(_id);
    }

}
