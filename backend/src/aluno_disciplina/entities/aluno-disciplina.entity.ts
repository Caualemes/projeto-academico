import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('aluno_disciplina')
export class AlunoDisciplina extends BaseEntity {
  @PrimaryColumn({ name: 'ALUNO_ID', type: 'int' })
  alunoId!: number;

  @PrimaryColumn({ name: 'DISCIPLINA_ID', type: 'int' })
  disciplinaId!: number;

  @Column({ name: 'STATUS', type: 'varchar', length: 20, default: 'Ativo' })
  status!: string;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'ALUNO_ID' })
  aluno!: Aluno;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'DISCIPLINA_ID' })
  disciplina!: Disciplina;

  constructor(data: Partial<AlunoDisciplina> = {}) {
    super();
    Object.assign(this, data);
  }
}
