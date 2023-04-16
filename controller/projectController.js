const projectSc = require("../schema/project_schema")

exports.createProject = async (req, res)=> {
    const {pname, pimage, pdesc, tags, stack, GitHub, pUrl, ownerId, isPrivate, isGroup, groupArray} = req.body;
  
    if(!pname|| !pimage||!pdesc ||!tags|| !stack|| !GitHub|| !pUrl|| !ownerId ||!isPrivate|| !isGroup || !groupArray ){
        return res.status(300).json({
            message: "Some fields are missing"
        })
    }
    try
    {
        let project = await projectSc.create({ pname, pimage, pdesc, tags, stack, GitHub, pUrl, ownerId, isPrivate, isGroup, groupArray});
        console.log(project);
        res.status(200).json({
            message : "Successfully created project",
            project
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            message:" Something went wrong "
        })
    }



    
}