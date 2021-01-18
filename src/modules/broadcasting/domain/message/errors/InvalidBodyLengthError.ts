import { DomainError } from '../../../../../core/errors/DomainError'

export class InvalidBodyLengthError extends Error implements DomainError {
  constructor() {
    super(`The message body must contains at least 20 characters.`)
    this.name = 'InvalidBodyLengthError'
  }
}
