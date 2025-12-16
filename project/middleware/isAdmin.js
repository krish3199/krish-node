exports.isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if (!user || !user.isAdmin) {
            return res.status(404).json({ message: "Admin not Authorize !" })
        }
        next()
        
    } catch (error) {
        return res.status(501).json({ message: "Error while Admin Autherize !", error })
    }
}