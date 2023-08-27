import { Command } from 'commander';

import AddUserCommand from './AddUserCommand.js'; // Ajusta la importación según la ubicación real del archivo

const CreateDefaultAdminCommand = new Command('create-default-admin');

CreateDefaultAdminCommand.version('1.0.0')
  .description('Create default admin user')
  .option('-e, --email <email>', 'User email')
  .option('-p, --password <password>', 'User password')
  .action(async (options) => {
    if (!options.email) {
      options.email = 'admin@coder.com';
    }
    if (!options.password) {
      options.password = 'admin';
    }

    const userArgs = [
      '--',
      'add-user',
      '--email',
      options.email,
      '--password',
      options.password,
      '--firstName',
      'Admin',
      '--lastName',
      'User',
      '--age',
      99,
      '--isAdmin',
      true,
    ];
    try {
      await AddUserCommand.parseAsync(userArgs);
    } catch (error) {
      console.error('Error creating admin user:', error.message);
    }
  });

export default CreateDefaultAdminCommand;
