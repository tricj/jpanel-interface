var node_ssh = require('node-ssh');
var ssh = new node_ssh();

ssh.connect({
    host: '52.56.79.136',
    username: 'ubuntu',
    privateKey: 'C:\\Users\\Jay\\Google Drive\\Uni\\Year 3 resit\\dissertation\\.ssh\\ldn-aws-openssh.key'
}).then(function(){
    console.log('Connected to host');
    ssh.execCommand('hostname && whoami', { cwd:'~' }).then(function(result) {
        console.log('STDOUT: ' + result.stdout);
        console.log('STDERR: ' + result.stderr);
    });
});

