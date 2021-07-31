import express from 'express'

import { adaptMiddleware } from '../adapters/ExpressMiddlewareAdapter'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'
import { makeCreateMessageController } from '../factories/controllers/CreateMessageControllerFactory'
import { makeGetMessageDetailsController } from '../factories/controllers/GetMessageDetailsControllerFactory'
import { makeGetMessageStatsController } from '../factories/controllers/GetMessageStatsControllerFactory'
import { makeSearchMessagesController } from '../factories/controllers/SearchMessagesControllerFactory'
import { makeSendMessageController } from '../factories/controllers/SendMessageControllerFactory'
import { makeEnsureAuthenticatedMiddleware } from '../factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

const messagesRouter = express.Router()

messagesRouter.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()))

messagesRouter.get('/search', adaptRoute(makeSearchMessagesController()))
messagesRouter.get('/:id', adaptRoute(makeGetMessageDetailsController()))
messagesRouter.post('/', adaptRoute(makeCreateMessageController()))
messagesRouter.post('/:id/send', adaptRoute(makeSendMessageController()))
messagesRouter.get(
  '/:messageId/stats',
  adaptRoute(makeGetMessageStatsController())
)

export { messagesRouter }
