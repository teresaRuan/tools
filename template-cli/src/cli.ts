import cac from 'cac';
import { init } from './core/init';

const cli = cac();

cli.command('create <name>', 'Create a new project').action(init);

cli.parse();
