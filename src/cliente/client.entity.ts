import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 20 })
  identificacion: string;

  @Column({ length: 15 })
  telefono: string;

  @Column({ length: 255 }) // Ajusta la longitud según tus necesidades
  correo: string;
  

}