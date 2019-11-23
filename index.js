const { cmds } = require('./src/cmds');

const runCmd = async () => {
    try {
        if (process.argv.length != 4) {
            throw new Error('Invalid number of argument');
        }

        const [, , cmd, param] = process.argv;

        if (!Object.keys(cmds).includes(cmd)) {
            throw new Error(`Invalid command: ${cmd}`);
        }
        await cmds[cmd](param);
    } catch (e) {
        console.log(e);
    }
};

runCmd();
