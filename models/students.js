const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    enrollmentDepartment:{
        type:String,
        require:true
    },
    enrollemntDate:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('studentModel1',studentSchema)