import app from './app'
import { config } from './config'
import { dbConnect } from './utils/db'

dbConnect()

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})
