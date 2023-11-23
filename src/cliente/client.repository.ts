import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientRepository {
 constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
 ) {}

 async findAll(): Promise<ClientEntity[]> {
    try{
        const clients = await this.clientRepository.find();
        return clients;
    } catch (error){
        console.error(error);
        throw new HttpException('Error al obtener los clientes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(clientId: number): Promise<ClientEntity | null> {
    try {
      const client = await this.clientRepository.findOne({ where: { id: clientId } });
      return client || null;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al obtener el cliente por ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  async testDatabaseConnection(): Promise<string> {
    try {
      const clients = await this.clientRepository.find();
      return `Conexión a la base de datos establecida. Número de clientes: ${clients.length}`;
    } catch (error) {
      console.error('Error en la conexión a la base de datos:', error);
      throw error;
    }
  }

  async createClient(clientData: Partial<ClientEntity>): Promise<ClientEntity> {
    try {
      const newClient = this.clientRepository.create(clientData);
      return await this.clientRepository.save(newClient);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al crear el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateClient(clientId: number, updatedData: Partial<ClientEntity>): Promise<ClientEntity> {
    try {
      const existingClient = await this.clientRepository.findOne({ where: { id: clientId } });

      if (!existingClient) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }
      // Actualizar propiedades del cliente 
      this.clientRepository.merge(existingClient, updatedData);

      // Guardar el cliente actualizado en la base de datos
      const updatedClient = await this.clientRepository.save(existingClient);

      return updatedClient;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al actualizar el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  
  async deleteClient(clientId: number): Promise<void> {
    try {
      await this.clientRepository.delete(clientId);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al eliminar el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}