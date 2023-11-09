import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import uploadImage from './src/components/ImageUpload.vue';
import avatarUpload from './src/AvatarUpload.vue';

export const ImageUpload = withInstall(uploadImage);
export const BasicUpload = withInstall(basicUpload);
export const AvatarUpload = withInstall(avatarUpload);
