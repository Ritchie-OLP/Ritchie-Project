const { filterModulesByLanguage, getModuleById, saveModule } = require("../models/moduleModel");

exports.getModules = async (req, res) => {
    try {
        const { id } = req.params;
        const modules = await filterModulesByLanguage(id);
        if (!modules) {
            return res.status(400).json({ message: 'No modules found' });
        }
        res.json(modules);
    } catch (err) {
        console.error('Error en getModules:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getModuleById = async (req, res) => {
    try {
        const { id } = req.params;
        const module = await getModuleById(id);
        if (!module) {
            return res.status(400).json({ message: 'No module found' });
        }
        res.json(module);
    } catch (err) {
        console.error('Error en getModuleById:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

exports.saveModule = async (req, res) => {
    try {
        const { name, languageId, content, image } = req.body;
        const module = await saveModule(name, languageId, content, image);
        res.status(200).json(module);
    } catch (err) {
        console.error('Error en saveModule:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}