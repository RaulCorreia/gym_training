const User = require('../../models/User');


module.exports = {

    async createExercise(req, res) {
    
        try {
    
        
    
            res.json({ a: 'teste' });
    
        } catch (err) {
            console.log(err);
            return res.status(400).json({ mensagem: 'Registro falhou' });
        }
    
    },
}