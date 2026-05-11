import { ConverterUsuario } from '../../../usuario/dto/converter/usuario.converter';
import { Aluno } from '../../entities/aluno.entity';
import { AlunoResponse } from '../response/aluno.response';
import { ROTA } from '../../../commons/constants/url.sistema';

export class ConverterAluno {
  static toAlunoResponse(aluno: Aluno): AlunoResponse {
    const alunoResponse = new AlunoResponse();
    alunoResponse.idAluno = aluno.idAluno;
    alunoResponse.codAluno = aluno.codAluno;
    alunoResponse.nomeAluno = aluno.nomeAluno;
    alunoResponse.idade = aluno.idade;
    alunoResponse.idUsuario = aluno.idUsuario;

    if (aluno.usuario) {
      alunoResponse.usuario = ConverterUsuario.toUsuarioResponse(aluno.usuario);
    }

    // HATEOAS Links
    const baseUrl = ROTA.ALUNO.BASE;
    alunoResponse._links = {
      self: { href: `${baseUrl}/buscar/${aluno.idAluno}`, method: 'GET' },
      update: { href: `${baseUrl}/alterar/${aluno.idAluno}`, method: 'PUT' },
      delete: { href: `${baseUrl}/excluir/${aluno.idAluno}`, method: 'DELETE' },
    };

    return alunoResponse;
  }

  static toListAlunoResponse(alunos: Aluno[]): AlunoResponse[] {
    return alunos.map((aluno) => this.toAlunoResponse(aluno));
  }
}
