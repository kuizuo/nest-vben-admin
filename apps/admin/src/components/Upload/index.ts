import { withInstall } from '/@/utils';
import basicUpload from './src/BasicUpload.vue';
import avatarUpload from './src/AvatarUpload.vue';

export const BasicUpload = withInstall(basicUpload);

export const AvatarUpload = withInstall(avatarUpload);
