import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./entities/message.entity";

@Injectable()
export class MessageRepository {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>){}

    async create(message: Message){
        const newMessage = new this.messageModel(message);
        return newMessage.save()
    }
}