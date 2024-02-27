import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest)
}

app.use('*', logger(customLogger))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/dji-drone-app', async (c) => {
  const reqBody = await c.req.json()
  customLogger("DJIDroneApp: ", JSON.stringify(reqBody))
  return c.text("dji-drone-app", 201)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
