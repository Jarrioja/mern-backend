import { Command } from 'commander';
import CreateDefaultRolesCommand from './CreateDefaultRolesCommand.js'; // Ajusta la importación según la ubicación real del archivo
import CreateDefaultAdminCommand from './CreateDefaultAdminCommand.js';

const initCommand = new Command('init');

initCommand.description('Initialize the application').action(async (options) => {
  try {
    const roleArgs = ['--', 'create-default-roles'];

    await CreateDefaultRolesCommand.parseAsync(roleArgs);

    await CreateDefaultAdminCommand.parseAsync();

    console.log('Initialization complete');
    console.log('Admin user: admin@coder.com');
    console.log('Admin password: admin');
  } catch (error) {
    console.error('Initialization error:', error.message);
    console.log('Admin user: admin@coder.com');
    console.log('Admin password: admin');
  } finally {
    process.exit(0);
  }
});

export default initCommand;
