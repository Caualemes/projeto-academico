import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Professor } from '../../professor/entities/professor.entity';

@Entity('disciplina')
export class Disciplina extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_DISCIPLINA',
    type: 'int',
  })
  idDisciplina?: number;

  @Column({
    name: 'NOME_DISCIPLINA',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  nomeDisciplina?: string;

  @Column({
    name: 'PERIODO',
    type: 'int',
    nullable: false,
  })
  periodo!: number;

  @ManyToOne(() => Professor)
  @JoinColumn({ name: 'ID_PROFESSOR' })
  professor?: Professor;

  @Column({ name: 'ID_PROFESSOR', type: 'int', nullable: true })
  idProfessor?: number;

  constructor(data: Partial<Disciplina> = {}) {
    super();
    Object.assign(this, data);
  }
}
