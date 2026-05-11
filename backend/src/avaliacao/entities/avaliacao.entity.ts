import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';

@Entity('avaliacao')
export class Avaliacao extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_AVALIACAO',
    type: 'int',
  })
  idAvaliacao?: number;

  @Column({
    name: 'DESCRICAO',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  descricao?: string;

  @ManyToOne(() => Disciplina)
  @JoinColumn({ name: 'DISCIPLINA_ID' })
  disciplina!: Disciplina;

  @Column({ name: 'DISCIPLINA_ID', type: 'int', nullable: false })
  disciplinaId!: number;

  constructor(data: Partial<Avaliacao> = {}) {
    super();
    Object.assign(this, data);
  }
}
