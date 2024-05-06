const logins=require('../Model/loginSchema')

//login logic
exports.login = async (req, res) => {

    const { f_userName, f_Pwd } = req.body
    try {

        const existingUser = await logins.findOne({ f_userName, f_Pwd })
        if (existingUser) {
            res.status(200).json({ status:true , message:'Login Successfull',data:existingUser})
        }

        else {
            res.status(401).json("invalid login")
        }
    }

    catch (err) {
        res.status(500).json("server error: " + err.message)
    }
}