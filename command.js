var colors = require("colors");
var exec = require('child_process').exec;
var readline = require('readline');

var rootDirectory = process.cwd();
var cwd = rootDirectory;
var cwd_path = "";

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
poll();

function poll ()
{
	rl.question(cwd_path + "> ", function(answer) {
		execute (answer);
	});
}

function execute (cmd)
{
	if (cmd == 'quit')
	{
		rl.close();
	}
	else if (cmd.slice(0,2) === "cd")
	{
		changeDirectory(cmd);
		poll();
	}
	else
	{
		var child = exec(cmd, function (error, stdout, stderr) {
			if (error !== null)
			{
				console.log(error.toString().red);
			}
			else
			{
				if (stdout !== null && stdout !== "")
				{
					console.log(stdout);
				}
				if (stderr !== null && stderr !== "")
				{
					console.log(stderr.red);
				}
			}
			poll();
		});
	}
}

function changeDirectory(cmd)
{
	try
	{
		process.chdir(cmd.slice(3, cmd.length));
		cwd = process.cwd();
		if (cwd.length < rootDirectory.length ||
			cwd.slice(0,rootDirectory.length) !== rootDirectory)
		{
			cwd = rootDirectory;
			process.chdir(rootDirectory);
			cwd_path = "";
		}
		else
		{
			cwd_path = cwd.slice(rootDirectory.length + 1, cwd.length);
		}
	}
	catch (exception)
	{
		console.warn("Could not find that directory: ".red + exception);
	}
}
