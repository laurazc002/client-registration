import { Controller,Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Controller('user')
export class UsuarioController {
    constructor(private readonly clientLoginService: UserRepository) {}
    
    @Post()
    async login(@Body() credentials: { username: string; password: string }): Promise<string> {
        const { username, password } = credentials;
        
        try {
            const user = await this.clientLoginService.findByUsernameAndPassword(username, password);
            if (!user) {
                throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
            }
            
            return 'Inicio de sesión exitoso';  // Puedes personalizar este mensaje
        }  catch (error) {
            throw new HttpException('Error en el proceso de inicio de sesión', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
