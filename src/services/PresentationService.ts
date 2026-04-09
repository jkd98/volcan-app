import { Presentation } from '../models/index.js';

class PresentationService {
    static async createPresentation(data: any) {
        // Aquí podrías validar si ya existe una presentación con el mismo nombre
        // o aplicar lógica específica de la envasadora antes de guardar.
        return await Presentation.create(data);
    }

    static async getAllPresentations() {
        return await Presentation.findAll();
    }
}

export default PresentationService;