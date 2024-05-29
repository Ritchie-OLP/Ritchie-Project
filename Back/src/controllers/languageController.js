const { filterLanguagesByRoute, getLanguageById, saveLanguage } = require("../models/languageModel");

exports.getLanguages = async (req, res) => {
    try {
        const { id } = req.params;
        const languages = await filterLanguagesByRoute(id);
        if (!languages) {
            return res.status(400).json({ message: 'No languages found' });
        }
        res.json(languages);
    } catch (err) {
        console.error('Error en getLanguages:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.getLanguageById = async (req, res) => {
    try {
        const { id } = req.params;
        const language = await getLanguageById(id);
        if (!language) {
            return res.status(400).json({ message: 'No language found' });
        }
        res.json(language);
    } catch (err) {
        console.error('Error en getLanguageById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.saveLanguage = async (req, res) => {
    try {
        const { name, routeId, image } = req.body;
        const language = await saveLanguage(name, routeId, image);
        res.status(200).json(language);
    } catch (err) {
        console.error('Error en saveLanguage:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}