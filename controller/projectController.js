const projectSc = require("../schema/project_schema")

exports.createProject = async (req, res) => {
    const { pname, pimage, pdesc, tags, stack, GitHub, pUrl, ownerId, isPrivate, isGroup, groupArray } = req.body;

    try {
        let project = await projectSc.create({ pname, pimage, pdesc, tags, stack, GitHub, pUrl, ownerId, isPrivate, isGroup, groupArray });
        console.log(project);
        res.status(200).json({
            message: "Successfully created project",
            project
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong "
        })
    }
}


exports.deleteProject = async (req, res) => {
    let id = req.params.id;

    try {
        const data = await projectSc.findByIdAndDelete(id);
        res.json({
            "status_code": 204,
            "status": `Deleted the project ${data.pname} with id ${data.id} from db`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not found "
        })
    }
}

exports.updateProject = async (req, res) => {
    // update api using patch

    let id = req.params.id;
    let updatedData = req.body;

    let options = { new: true };

    try {
        const data = await projectSc.findByIdAndUpdate(id, updatedData, options);

        res.status(201).send(data);
    } catch (error) {
        res.status().send(error.message);
    }
}

exports.getProject = async (req, res) => {

    let id = req.params.id;

    if (id === "all") {
        let data = await projectSc.find();
        res.status(200).json(data);
    }
    else {
        console.log(id);
        let data = await projectSc.findOne({ _id: id });
        if (data == null) {
            res.status(400).send({
                "message": "Invalid id"
            })
        }
        try {
            res.status(200).send(data);

        } catch (error) {
            res.status(500).send({
                "message": "Something went wrong..."
            })
        }

    }

}



