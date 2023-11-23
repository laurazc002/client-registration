import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 20 })
  usuario: string;

  @Column({ length: 10 })
  contraseña: string;

}