import { v4 as uuid } from 'uuid'

import { Name } from '../shared/name'
import { Email } from '../shared/email'
import { InvalidNameError } from '../shared/errors/InvalidNameError'
import { InvalidEmailError } from '../shared/errors/InvalidEmailError'
import { Either, left, right } from '../../../core/logic/Either'
import { Tag } from '../tag/tag'

interface IContactData {
  name: Name
  email: Email
}

export interface IContactCreateData {
  name: string
  email: string
}

export class Contact {
  public readonly id: string
  public readonly name: Name
  public readonly email: Email
  public readonly createdAt: Date

  public tags: Tag[]

  private constructor({ name, email }: IContactData, id?: string) {
    this.name = name
    this.email = email

    this.createdAt = new Date()
    this.tags = []

    this.id = id ?? uuid()
  }

  public subscribeToTag(tag: Tag) {
    this.tags.push(tag)
  }

  static create(
    recipientData: IContactCreateData,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError, Contact> {
    const nameOrError = Name.create(recipientData.name)
    const emailOrError = Email.create(recipientData.email)

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    const contact = new Contact(
      {
        name: nameOrError.value,
        email: emailOrError.value,
      },
      id
    )

    return right(contact)
  }
}
