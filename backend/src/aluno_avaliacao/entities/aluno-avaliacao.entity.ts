import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { Avaliacao } from '../../avaliacao/entities/avaliacao.entity';

@Entity('aluno_avaliacao')
export class AlunoAvaliacao extends BaseEntity {
  @PrimaryColumn({ name: 'ALUNO_ID', type: 'int' })
  alunoId!: number;

  @PrimaryColumn({ name: 'AVALIACAO_ID', type: 'int' })
  avaliacaoId!: number;

  @Column({ name: 'NOTA', type: 'decimal', precision: 4, scale: 2, nullable: true })
  nota?: number;

  @ManyToOne(() => Aluno)
  @JoinColumn({ name: 'ALUNO_ID' })
  aluno!: Aluno;

  @ManyToOne(() => Avaliacao)
  @JoinColumn({ name: 'AVALIACAO_ID' })
  avaliacao!: Avaliacao;

  constructor(data: Partial<AlunoAvaliacao> = {}) {
    super();
    Object.assign(this, data);
  }
}
