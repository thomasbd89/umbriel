import { Message } from '../domain/message/message'
import { MessageStats } from '../dtos/MessageStats'

export type MessagesSearchParams = {
  query?: string
  page: number
  perPage: number
}

export type MessagesSearchResult = {
  data: Message[]
  totalCount: number
}

export interface IMessagesRepository {
  findById(id: string): Promise<Message>
  save(message: Message): Promise<void>
  create(message: Message): Promise<void>
  search(params: MessagesSearchParams): Promise<MessagesSearchResult>
  getMessageStats(messageId: string): Promise<MessageStats>
}
