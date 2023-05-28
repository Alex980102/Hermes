import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LadaDocument = Lada & Document;

@Schema()
export class Lada {
    @Prop()
    ciudad: string;

    @Prop()
    lada: string;



}

export const LadaSchema = SchemaFactory.createForClass(Lada);