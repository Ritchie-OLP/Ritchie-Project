const { getAllQuizzes } = require("../models/quizModel");

exports.getAllQuizzes = async (req, res) => {
    try{
        const quizzes = await getAllQuizzes();
        res.status(200).json(quizzes);
    } catch(error){
        console.error('Error en getAllQuizzes:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}