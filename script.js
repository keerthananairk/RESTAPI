const express = require('express');
const Joi = require('joi');
const app=express();
app.use(express.json());

const customers= [
    {title:'George', id:1},
    {title:'Josh', id:2},
    {title:'Tylor', id:3},
    {title:'Alice', id:4}

]

app.get('/api/customers',(req,res)=>{
    res.send(customers);
});

app.post('/api/customers',(req,res)=>{
    const {error}=validateCustomer(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const customer={
        id:customers.length + 1,
        title:req.body.title
    }

})

function validateCustomer(customer){
    const schema={
        title:Joi.string().min(3).required()

    };
    return Joi.validate(customer,schema);
}

const port=process.env.PORT||8080;
app.listen(port,()=>console.log(`Listening on port ${port}`));