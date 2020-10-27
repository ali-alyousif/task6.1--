const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const https = require("https")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



app.get('/',(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})

app.post('/',(req, res)=>{
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    // console.log(firstname, lastname, email)

    const data = {
        members:[{
            email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname                
            }
        }]
    },

    jsonData = JSON.stringify(data) 

    
    const apiKey = "7ede10a93d87dec9d9b522f494551766-us2" //mailchimp API
   // const list_id = "0cf3ee0d3a"
    
    const url = "https://us2.api.mailchimp.com/3.0/lists/0cf3ee0d3a"

    const options = {
        method:"POST",
        auth:"azi:7ede10a93d87dec9d9b522f494551766-us2"
    }

    const request = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data ))
        })
    })
    
    request.write(jsonData)
    request.end()

    console.log(firstname, lastname, email)
})

app.listen(5000, (req, res)=>{
    console.log("server running at port 5000")
})