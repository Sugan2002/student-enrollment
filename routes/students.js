const express=require('express')
const router = express.Router()
const studentModel = require('../models/students')
router.get('/',async(request,response)=>{
    try{
    const students = await studentModel.find();
    response.status(200).json(students);
    }
    catch(error){
        console.log(error)
            response.status(500).json({message:error.message})
        
    }
})

router.post('/',async(request,response)=>{
    const newStudent = new studentModel({
        name: request.body.name,
        enrollmentDepartment: request.body.enrollmentDepartment,
        enrollmentDate: request.body.enrollmentDate
    })
    try{
        const student = await newStudent.save();
        response.status(201).json(student);
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})
//getByID
router.get('/:id', getStudent,(request,response)=>{
    response.status(200).json(response.student);
})

router.patch('/:id',(request,response)=>{
    if(request.boby.name!=null){
        response.student.name = request.body.name;
    }
    if(request.boby.enrollmentDepartment!=null){
        response.student.enrollmentDepartment = request.body.enrollmentDepartment;
    }
    try{
        const updateStudent = await response.student.save();
        response.statux(201).json(updateStudent)
    }
    catch(error){
        response.status(400).json({message:error.messag})
    }

})

router.delete('/:id'getStudent,async, (request,response)=>{
    try{
        await response.student.deleteOne();
        response.status(204).json({})
    }
})

async function getStudent(request,response,next){
    let student
    try{
        student = await studentModel.findById(request.params.id)
        if(student==null){
            return response.status(404).json({message:`cannot find user with id ${request.params.id}`})
        }
    }
    catch(error){
        return response.status(500).json({message:error.message})
    }
    response.student = student;
    next();
}


module.exports=router