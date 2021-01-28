import { v4 as uuid } from 'uuid'

import { Either, left, right } from '@core/logic/Either'

import { InvalidTitleLengthError } from './errors/InvalidTitleLengthError'
import { Title } from './title'

interface ITagData {
  title: Title
}

export interface ITagCreateData {
  title: string
}

export class Tag {
  public readonly id: string
  public readonly title: Title

  private constructor({ title }: ITagData, id?: string) {
    this.title = title

    this.id = id ?? uuid()
  }

  static create(
    tagData: ITagCreateData,
    id?: string
  ): Either<InvalidTitleLengthError, Tag> {
    const titleOrError = Title.create(tagData.title)

    if (titleOrError.isLeft()) {
      return left(titleOrError.value)
    }

    const tag = new Tag(
      {
        title: titleOrError.value,
      },
      id
    )

    return right(tag)
  }
}
