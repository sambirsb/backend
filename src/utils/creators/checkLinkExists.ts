import CreatorModel from '../../models/CreatorModel';

export async function checkLinkExists(userId: string, link: string) {
    const linkExists = await CreatorModel.findOne({ userId, link });
    if (linkExists) {
        throw new Error(
            'This user already has a creator with the provided link.'
        );
    }
}
