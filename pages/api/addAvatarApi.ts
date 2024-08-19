
import clientPromise from '@/lib/mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

const bucket = process.env.BUCKET_NAME!

const client = new S3Client({ region: process.env.AWS_REGION });

export default async () => {
    
}