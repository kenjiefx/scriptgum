const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const root = path.resolve(__dirname)
const fs = require('fs')

app.get('/create',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/create.html')
})
app.get('/index',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/index.html')
})
app.get('/login',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/login.html')
})
app.get('/oauth',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/oauth.html')
})
app.get('/register',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/register.html')
})
app.get('/assets/*',(request,response)=>{
    const resourceFile = request.params[0].split('?')[0]
    const assetPath = root+'/dist/assets/'+resourceFile
    if (!fs.existsSync(assetPath)) {
        response.status(404)
        response.json({error:'Page Not Found'})
        return
    }
    response.status(200)
    response.sendFile(assetPath)
})
app.use((request, response)=>{
    response.status(404)
    response.json({error:'Page Not Found'})
})

app.listen(port, () => {
    console.log(`Strawberry static listening on port ${port}`)
})