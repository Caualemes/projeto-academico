import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('professor')
export class Professor extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_PROFESSOR',
    type: 'int',
  })
  idProfessor?: number;

  @Column({
    name: 'COD_PROFESSOR',
    type: 'varchar',
    length: 10,
    unique: true,
  })
  codProfessor: string = '';

  @Column({
    name: 'NOME_PROFESSOR',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  nomeProfessor?: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario!: Usuario;

  @Column({ name: 'ID_USUARIO', type: 'int', nullable: false })
  idUsuario!: number;

  constructor(data: Partial<Professor> = {}) {
    super();
    Object.assign(this, data);
  }
}
