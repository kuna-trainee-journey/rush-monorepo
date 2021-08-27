import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { DIPrisma } from 'src/DIP';
import { PrismaClient } from '@prisma/client';

import { Order } from 'src/graphql/models/order.model';

import { CreateOneOrderArgs } from './args/CreateOneOrderArgs';
import { UpdateOneOrderArgs } from './args/UpdateOneOrderArgs';
import { FindUniqueOrderArgs } from './args/FindUniqueOrderArgs';
import { GqlAuthGuard } from '../Auth/guards/GqlAuthGuard';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from '../../inputs/JwtDto';

@UseGuards(GqlAuthGuard)
@Resolver(Order)
export class OrderResolver {
    constructor(
        @Inject(DIPrisma) private prisma: PrismaClient,
        private readonly jwt: JwtService
    ) {}

    @Query(() => [Order], { nullable: true })
    async allOrders(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

    @Query(() => Order, { nullable: true })
    async orderById(@Args() args: FindUniqueOrderArgs): Promise<Order> {
        return this.prisma.order.findUnique({ where: args });
    }

    @Mutation(() => Order)
    async createOrder(@Args() args: CreateOneOrderArgs): Promise<Order> {
        const payload: JwtDto = { userId: args.userId }
        this.jwt.sign(payload)
        return await this.prisma.order.create({ data: args });
    }

    @Mutation(() => Order)
    async updateOrder(@Args('id') id: string, @Args() args: UpdateOneOrderArgs): Promise<Order> {
        return this.prisma.order.update({ where: { id }, data: args });
    }

    @Mutation(() => Order)
    async deleteOrder(@Args('id') id: string): Promise<Order | null> {
        return this.prisma.order.delete({ where: { id } });
    }
}