import { IsNotEmpty } from 'class-validator';

export class SignInDTO {
    @IsNotEmpty()
    readonly login: string;

    @IsNotEmpty()
    readonly password: string;
}
