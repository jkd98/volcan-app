import { col, fn, Op, Sequelize } from 'sequelize';
import { Presentation, User } from '../models/index.js';
import { PresentationCreationAttributes } from '../models/Presentation.model.js';
import { UserAttributes } from '../models/Users.model.js';
import { DuplicateError, NotFoundError } from '../errors/SpecificErrors.js';

export class PresentationService {
    static async createPresentation(data: PresentationCreationAttributes, user_uuid: UserAttributes['uuid']) {
        const { name } = data;
        const user = await User.findOne({
            where: {
                uuid: {
                    [Op.eq]: user_uuid
                }
            }
        })

        if (!user) {
            throw new NotFoundError("El usuario no existe");
        }

        const presentation = await Presentation.findOne({
            where: {
                [Op.and]: [
                    { user_id: user.user_id },
                    Sequelize.where(
                        fn('LOWER', col('name')),
                        Op.eq,
                        name.toLowerCase().trim()
                    )
                ]
            }
        })

        if (presentation) {
            throw new DuplicateError("Ya tienes una presentación registrada con ese nombre");
        }

        const nwPresentation = new Presentation(data);
        nwPresentation.user_id = user.user_id;

        return nwPresentation;
    }

    static async getAllPresentations() {
        return await Presentation.findAll();
    }
}

export default PresentationService;