import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    currentPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    newPassword: string;
}
