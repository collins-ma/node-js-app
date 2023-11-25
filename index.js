const express=require("express");
const bodyParser=require("body-parser")
const Employee=require('./Employee.js')
const { connectFs } = require("./connectDb.js");
const app=express();
const port=3500;
connectFs();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



app.get('/employee', async(req, res)=>{
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(employees);




})


app.post( '/employee' ,  async(req,res)=>{
    if (!req?.body?.firstname || !req?.body?.lastname||!req?.body?.password) {
        return res.status(400).json({ 'message': 'password, first and last names are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password:req.body.password
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    


    

}
}
)

app.put( '/employee/:id', async(req, res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);




})

app.delete( '/employee/:id' , async(req, res)=>{
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);







})
app.get( '/employee/:id' , async(req, res)=>{
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Employee ID required.' });

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}.` });
    }





})


    



app.listen(port, ()=>{

    console.log(`server running on port ${port}`)
    
})





