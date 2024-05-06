const employees = require('../Model/employeeSchema')

exports.addEmployee = async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body
    try {
        const f_Id = Math.floor(Math.random() * 99) + 1;
        const existingEmployee = await employees.findOne({ f_Email})
        if (existingEmployee) { 
            res.status(404).json({ message: "Employee already exists" })
        }

        else {
            const f_Image = req.file.filename 
            const newEmployee = new employees({ f_Id, f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course })
            await newEmployee.save()
            res.status(200).json({ status: true, message: 'Employee added succesfully',data : newEmployee })
        }
    }

    catch (err) {
        res.status(500).json("server error: " + err.message)
    }
}

exports.getemployee = async(req,res) =>{
    try{
        const searchKey = req.query.search
        console.log(searchKey)
    
        const query = {
            f_Name: {
                 $regex: searchKey, $options: 'i'
            }}
            const allEmployees = await employees.find(query)
            res.status(200).json({status:true , data:allEmployees})
    }
    catch(err){
        res.status(500).json("server error: " + err.message)
    }
}

//edit

exports.updateEmployee = async(req,res)=>{
    const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course , f_Image} = req.body
    const uploadImage = req.file?req.file.filename:f_Image;

    const id = req.params.id

    try{

                const updateEmployee = await employees.findByIdAndUpdate({_id:id}, {f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course , f_Image:uploadImage},{new:true})

                await updateEmployee.save()
                res.status(200).json({status:true ,message:"Employee updated succesfully" ,data : updateEmployee})
                console.log(updateEmployee)
             }
             catch(error){
                res.status(401).json(error)
             }
} 

//delete
exports.deleteEmployee = async (req,res) => {
    const {id} = req.params 

    try{
        const deleteData = await employees.findByIdAndDelete({_id:id})
        res.status(200).json({status:true, message:'Employee deleted successfully'})
    }
    catch(err){
        res.status(401).json(err.message)
    }
}