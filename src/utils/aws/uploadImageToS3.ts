import {
    ObjectCannedACL,
    PutObjectCommand,
    PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { config } from '../../constants/config/env';
import s3Client from '../../../config/awsConfig';

const bucketName = config.AWS_BUCKET_NAME;
const awsRegion = config.AWS_REGION;

if (!bucketName) {
    throw new Error(
        'AWS bucket name is not defined in the environment variables.'
    );
}

if (!awsRegion) {
    throw new Error('AWS region is not defined in the environment variables.');
}

export const uploadImageToS3 = async (
    file: Express.Multer.File | undefined
): Promise<string> => {
    if (!file) {
        throw new Error('No file provided.');
    }

    const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: 'image/webp',
        ACL: 'public-read' as ObjectCannedACL,
    };

    try {
        const command = new PutObjectCommand(uploadParams) as any;
        const response = await s3Client.send(command);

        console.log('File uploaded successfully:', response);

        return `https://${uploadParams.Bucket}.s3.${awsRegion}.amazonaws.com/${uploadParams.Key}`;
    } catch (error) {
        throw new Error(`Failed to upload file to S3. ${error}`);
    }
};
