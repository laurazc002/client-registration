import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException } from '@nestjs/common';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';

@Controller('clients')
export class ClienteController {
  constructor(private readonly clientRepository: ClientRepository) {}

  @Get()
  async findAll(): Promise<ClientEntity[]> {
    try {
      const clients = await this.clientRepository.findAll();
      return clients;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al obtener los clientes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getClientById(@Param('id') clientId: number): Promise<ClientEntity> {
    try {
      const client = await this.clientRepository.findById(clientId);

      if (!client) {
        throw new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
      }

      return client;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al obtener el cliente por ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('test-connection')
  async testDatabaseConnection(): Promise<string> {
    try {
      const result = await this.clientRepository.testDatabaseConnection();
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al probar la conexión a la base de datos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createClient(@Body() clientData: Partial<ClientEntity>): Promise<ClientEntity> {
    try {
      const newClient = await this.clientRepository.createClient(clientData);
      return newClient;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al crear el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateClient(
    @Param('id') clientId: number,
    @Body() updatedData: Partial<ClientEntity>,
  ): Promise<ClientEntity> {
    try {
      const updatedClient = await this.clientRepository.updateClient(clientId, updatedData);
      return updatedClient;
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al actualizar el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteClient(@Param('id') clientId: number): Promise<void> {
    try {
      await this.clientRepository.deleteClient(clientId);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error al eliminar el cliente', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
