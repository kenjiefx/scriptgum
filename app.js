const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const root = path.resolve(__dirname)
const fs = require('fs')

const handleAssetsRequest=(request,response)=>{
    const resourceFile = request.params[0].split('?')[0]
    const assetPath = root+'/dist/assets/'+resourceFile
    if (!fs.existsSync(assetPath)) {
        response.status(404)
        response.json({error:'Page Not Found'})
        return
    }
    response.status(200)
    response.sendFile(assetPath)
}

app.get('/create',(request,response)=>{
    response.status(200)
    response.sendFile(root+'/dist/create.html')
})
app.get('/:username/create',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/create.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER',request.params.username)
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','private')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/index',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/index.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/login',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/login.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/oauth',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/oauth.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/checkpoint',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/verification.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/confirm/email',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/confirm-email.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/register',(request,response)=>{
    let content = fs.readFileSync(root+'/dist/register.html').toString()
    content = content.replace('USERNAME_METAPAGE_PLACEHOLDER','null')
    content = content.replace('PAGE_METAPAGE_PLACEHOLDER','public')
    response.setHeader('Content-Type', 'text/html')
    response.status(200)
    response.send(content)
})
app.get('/assets/*',handleAssetsRequest)
app.get('/:username/assets/*',handleAssetsRequest)
app.use((request, response)=>{
    response.status(404)
    response.json({error:'Page Not Found'})
})

app.listen(port, () => {
    console.log(`Strawberry static listening on port ${port}`)
})