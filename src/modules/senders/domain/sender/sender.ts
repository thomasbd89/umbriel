import { Entity } from '@core/domain/Entity'
import { Either, right } from '@core/logic/Either'

import { Email } from './email'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidNameError } from './errors/InvalidNameError'
import { Name } from './name'

interface ISenderProps {
  name: Name
  email: Email
}

export class Sender extends Entity<ISenderProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  private constructor(props: ISenderProps, id?: string) {
    super(props, id)
  }

  static create(
    props: ISenderProps,
    id?: string
  ): Either<InvalidNameError | InvalidEmailError, Sender> {
    const sender = new Sender(props, id)

    return right(sender)
  }
}
