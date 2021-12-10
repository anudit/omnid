const { initialize } = require('zokrates-js/node');

initialize().then((zokratesProvider) => {
    const source = `import "hashes/sha256/512bitPacked" as sha256packed

    def main(private field a, private field b, private field c, private field d) -> field[2]:
        field[2] h = sha256packed([a, b, c, d])
        return h
    `;

    // compilation
    const artifacts = zokratesProvider.compile(source);

    // computation
    const { witness, output } = zokratesProvider.computeWitness(artifacts, ["2"]);

    // run setup
    const keypair = zokratesProvider.setup(artifacts.program);

    // generate proof
    const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);

    // export solidity verifier
    const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk, "v1");
});
