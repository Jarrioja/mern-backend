import UserManager from './domain/managers/userManager.js';
import cron from 'node-cron';

const softDeleteInactiveUsers = async () => {
  const manager = new UserManager();
  try {
    const softDeleteInactiveUsers = await manager.softDeleteInactiveUsers();
    console.log(`${softDeleteInactiveUsers} users soft deleted successfully`);
  } catch (error) {
    console.log(`Failed to soft delete inactive users: ${error.message}`);
  }
};
export const every2DaysSoftDeleteUsers = cron.schedule('0 0 */2 * *', softDeleteInactiveUsers);
