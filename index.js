
const dbConnect=require('./mongodb');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const SwaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
const options ={
    defintion:{
        openapi:'3.0.0',
        info:{
            title:'nodeJs Api mongodb projet',
            version:'1.0.0'
        },
        servers:[{
          api:  'http://localhost/3002/'
        }]

    },
    apis:['index.js']
}
const swaggerspec = swaggerJsDoc(options);
app.use('/api-docs',SwaggerUi.serve, SwaggerUi.setup(swaggerspec));
app.get('/', async(req, res)=>{
    var response = {} // empty Object
    var key = 'StudentResponse';
    response[key] = []; // empty Array, which you can push() values into
    let statuscode = 1;
    var description = 'success';
    let result_JSON =[{}];
    var recordcount=0;
    try {

       
        let result = await dbConnect();
        result= await result.find().toArray();
        result_JSON = result;
        //throw new Error("my error occurred");
        recordcount = result.length;
       
    }
    catch (err) {
         statuscode = 2;
         description = "Error";
        console.log(err);
    }
    
    var statusJSON =  {'Status': statuscode,'Description': description,'RecordCount': recordcount}  
    response[key].push(statusJSON);
    response[key].push(result_JSON);
    res.send(response);
 
});
app.listen(3002);
app.post('/Adding', async(req, res)=>{
    let result = await dbConnect();
    result= result.insertOne(req.body);
    res.send("inserted successfully");

});
app.put('/', async(req, res)=>{
    let result = await dbConnect();
    result=  await result.updateOne({name:req.body.name},{$set:req.body});
    res.send("updated successfully");
});

app.delete('/:name', async(req, res)=>{
    let result = await dbConnect();
    result= await result.deleteOne({name:req.params.name});
    res.send("delected successfully");
});