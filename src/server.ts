import app from './app'
import { libsql } from './database/database'
import { ErrorMiddleware } from './middlewares/error.middleware'

const PORT = process.env.PORT || 3000
app.use(ErrorMiddleware)

app.use(async (req, res, next) => {
    await libsql.sync()
    next()
  })

app.listen(PORT, ()=>{
    console.log("servidor encendido en el puerto:"+PORT)
})