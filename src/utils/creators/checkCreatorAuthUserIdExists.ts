import CreatorModel from '../../models/CreatorModel';

export async function checkCreatorAuthUserIdExists(user_id: string) {
    const userIdExists = await CreatorModel.findOne({
        'creatorAuth.user_id': user_id,
    });
    if (userIdExists) {
        throw new Error('This creator already added to Top Creator.');
    }
}
