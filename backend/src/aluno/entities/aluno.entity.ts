import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../commons/entity/base.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Cidade } from '../../cidade/entity/cidade.entity';

@Entity('aluno')
export class Aluno extends BaseEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'ID_ALUNO',
    type: 'int',
  })
  idAluno?: number;

  @Column({
    name: 'COD_ALUNO',
    type: 'varchar',
    length: 10,
    unique: true,
  })
  codAluno: string = '';

  @Column({
    name: 'NOME_ALUNO',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  nomeAluno?: string;

  @Column({
    name: 'IDADE',
    type: 'int',
    nullable: true,
  })
  idade?: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'ID_USUARIO' })
  usuario!: Usuario;

  @Column({ name: 'ID_USUARIO', type: 'int', nullable: false })
  idUsuario!: number;

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'ID_CIDADE' })
  cidade?: Cidade;

  @Column({ name: 'ID_CIDADE', type: 'int', nullable: true })
  idCidade?: number;

  constructor(data: Partial<Aluno> = {}) {
    super();
    Object.assign(this, data);
  }
}
