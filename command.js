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

(function main() {
	if (process.argv[2])
	{
		changeDirectory("cd " + process.argv[2]);
	}

	if (process.argv[3])
	{
		execute(process.argv[3]);
	}
	else
	{
		poll();
	}
})();


function poll ()
{
	rl.question(cwd_path + "> ", function(answer) {
		execute (answer);
	});
}

function execute (cmd)
{
	if (cmd == 'q')
	{
		rl.close();
	}
	else if (cmd == "root")
	{
		console.log("Root Directory: " + rootDirectory);
		poll();
	}
	else if (cmd.slice(0,2) === "cd")
	{
		changeDirectory(cmd);
		poll();
	}
	else if (cmd.slice(0,5) === "start")
	{
		console.log("Start is blocked until further notice!");
		poll();
	}
	else if (cmd.slice(0,4) === "node")
	{
		console.log("Node is blocked until further notice!");
		poll();
	}
	else
	{
		var child = exec(cmd, function (error, stdout, stderr) {
			if (error !== null)
			{
				console.log(error.toString().red);
			}
			if (stdout !== null && stdout !== "")
			{
				console.log(stdout);
			}
			if (stderr !== null && stderr !== "")
			{
				console.log(stderr.red);
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
