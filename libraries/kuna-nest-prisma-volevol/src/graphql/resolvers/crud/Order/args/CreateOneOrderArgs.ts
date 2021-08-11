import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@ArgsType()
export class CreateOneOrderArgs {
    @Field((type) => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    delivery?: string | null;

    @Field((type) => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    payment?: string | null;

    @Field((type) => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    address?: string | null;

    @Field((type) => String, { nullable: true })
    @IsUUID()
    userId: string | null;

    @Field((type) => String, { nullable: true })
    @IsUUID()
    vehicleId: string | null;
}