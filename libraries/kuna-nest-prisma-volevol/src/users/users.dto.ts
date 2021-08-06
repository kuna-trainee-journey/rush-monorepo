import {IsString, Length, IsEmail} from "class-validator"

export class UserDto {
    id: string
    @IsString({message: 'Должно быть строкой'})
    name: string
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    email: string
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не еньше 4 и не больше 16'})
    password: string
}