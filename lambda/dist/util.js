"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3PreSignedUrl = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3SigV4Client = new aws_sdk_1.default.S3({
    signatureVersion: 'v4',
    region: process.env.S3_PERSISTENCE_REGION
});
function getS3PreSignedUrl(s3ObjectKey) {
    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60 * 1 // the Expires is capped for 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;
}
exports.getS3PreSignedUrl = getS3PreSignedUrl;
