import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConverterAluno } from '../dto/converter/aluno.converter';
import { CreateAlunoDto } from '../dto/create-aluno.dto';
import { AlunoResponse } from '../dto/response/aluno.response';
import { Aluno } from '../entities/aluno.entity';

@Injectable()
export class AlunoServiceCreate {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<AlunoResponse> {
    const exists = await this.alunoRepository.findOne({
      where: { codAluno: createAlunoDto.codAluno },
    });

    if (exists) {
      throw new ConflictException('Aluno com este código já existe.');
    }

    const alunoData = new Aluno({
      ...createAlunoDto,
    });

    const savedAluno = await this.alunoRepository.save(alunoData);

    const savedWithUser = await this.alunoRepository.findOne({
      where: { idAluno: savedAluno.idAluno },
      relations: ['usuario'],
    });

    return ConverterAluno.toAlunoResponse(savedWithUser!);
  }
}
