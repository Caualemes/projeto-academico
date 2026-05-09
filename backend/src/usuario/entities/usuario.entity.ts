import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn({name: 'ID_USUARIO'})
    idUsuario!: number

    @Column({name: 'FIRST_NAME', length: 100})
    firstName!: string

    @Column({name: 'LAST_NAME', length: 100})
    lastName!: string

    @Column({name: 'USERNAME', length: 50, unique: true})
    username!: string

    @Column({name: 'EMAIL', length: 150, unique: true})
    email!: string

    @Column({name: 'PASSWORD', length: 255})
    senha!: string

    @Column({name: 'STATUS_VALIDACAO', default: false})
    statusValidacao!: boolean

    @Column({name: 'RECOVERY_TOKEN', type: 'varchar', length: 255, nullable: true})
    recoveryToken?: string

    @Column({name: 'TOKEN_EXPIRES', type: 'datetime', nullable: true})
    tokenExpires?: Date

    @Column({name: 'INCLUIDO_POR', length: 50, nullable: true})
    incluidoPor?: string

    @CreateDateColumn({name: 'CREATED_AT'})
    createdAt?: Date

    @Column({name: 'ALTERADO_POR', length: 50, nullable: true})
    alteradoPor?: string

    @UpdateDateColumn({name: 'UPDATED_AT'})
    updatedAt?: Date

    constructor(data: Partial<Usuario> = {}) {
        Object.assign(this, data);
    }
}