const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { registerValidation, loginValidation } = require('../util/validation');
const User = require('../../models/User');


module.exports = {

    async register(req, res) {
        // Validação dos dados
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ mensagem: error.details[0].message });
    
        try {
    
            const { name, email, password } = req.body;
    
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.findOne({ 
                attributes: ['name', 'email'],
                where: { email } 
            });

            if(user) return res.status(400).json({ mensagem: 'Email ja cadastrado' });

            user = await User.create({ name, email, password: hashPassword });
    
            res.json({ user });
    
        } catch (err) {
            console.log(err);
            return res.status(400).json({ mensagem: 'Registro falhou' });
        }
    
    },


    async login(req, res) {

        // Validação dos dados
        let { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ mensagem: error.details[0].message });
    
        const { email, password } = req.body;
    
        // Seleciona user
        const user = await User.findOne({ 
            where: { email } 
        });

        if(!user) return res.status(400).json({ mensagem: 'Email e/ou senha inválido' });
    
        // Validação de senha
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(401).json({ mensagem: 'Email e/ou senha inválido' });
    
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
    
        res.json({ name: user.name, email: user.email, token });
    },


    async getUser(req, res) {

        // Validação dos dados
        const { user_id } = req.params;
        if (!user_id) return res.status(400).json({ mensagem: 'Id do usuario não fornecido' });
    
        // Seleciona user
        const user = await User.findByPk(user_id, {
            attributes: ['name', 'email'],
        });

        if(!user) return res.json({ mensagem: 'Usuario não encontrado' });
    
        res.json({ user });
    },


}