const run = () => {
  console.log(`
  Usage: deno run --allow-net --allow-read https://deno.land/x/depsbot/src/cli/mod.ts [options]

  Options:
    -h, --help     Show help
    -v, --version  Show version number
    -f, --file     Dependency file to read and update (string [default: "deps.ts"])
    -u, --update   Update dependencies in file (default: false)
  `);
};

export default { run };
