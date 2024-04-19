const run = async () => {
  const versionFilePath = "cmd/trex/version.ts";
  const { version } = await import(versionFilePath);

  console.log(`v${version}`);

  return 0;
};

export default { run };
