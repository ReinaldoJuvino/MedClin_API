module.exports = app => {

    const save = async (request,response) => {

        const {existOrError, notExistOrError} = app.src.api.validation
        const doctor = request.body
        
        if(request.params.id) doctor.id = request.params.id

        try {
            existOrError(doctor.crm,"Crm não informado")
            existOrError(doctor.specialty, "Especialidade não informada")

            const doctorFromDB = await app.db('doctor')
                .where({crm: doctor.crm}).first()
            
            if(!doctor.id){
                notExistOrError(doctorFromDB, "Doutor Já cadastrado")
            }

        } catch (msg) {

            return response.status(400).send(msg);
        }
        if(doctor.id) {
            app.db('doctor')
                .update(doctor)
                .where({ id: doctor.id })
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
        } else {
            app.db('doctor')
                .insert(doctor)
                .then(_ => response.status(204).send())
                .catch(err => response.status(500).send(err))
            
        }

    }

    const get = (request,response)=>{
        app.db('doctor')
            .select('id','crm','specialty','userId')
            .then(users => response.json(users))
            .catch(err => response.status(500).send(err))
    }
    const getUserByUserId = (request,response) => {
        app.db('users')
            .select()
            .where({id: request.params.id})
            .then(endereco => response.json(endereco))
            .catch(err => response.status(500).send(err))

    }

    return { save, get, getUserByUserId }
}