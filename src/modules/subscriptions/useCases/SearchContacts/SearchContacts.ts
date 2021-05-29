import { Contact } from '../../domain/contact/contact'
import { IContactsRepository } from '../../repositories/IContactsRepository'

type SearchContactsRequest = {
  query?: string
  page?: number
  perPage?: number
}

type SearchContactsResponse = Contact[]

export class SearchContacts {
  constructor(private contactsRepository: IContactsRepository) {}

  async execute({
    query,
    page = 1,
    perPage = 20,
  }: SearchContactsRequest): Promise<SearchContactsResponse> {
    const contacts = await this.contactsRepository.search({
      query,
      page,
      perPage,
    })

    return contacts
  }
}
