const { initialize } = require('zokrates-js/node');
const fs = require('fs');

const toHexString = bytes =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

initialize().then((zokratesProvider) => {

    fs.readFile(process.cwd() + '/circuits/circuit.zok', 'utf8', function(err, source){
        if(!err){
            let state = {};

            // Compile the zokrates circuit.
            const artifacts = zokratesProvider.compile(source);
            state['program'] = toHexString(artifacts.program);
            state['abi'] = JSON.parse(artifacts.abi);

            // Creates a proving key (pk) and a verification key (vk).
            // These keys are derived from a source of randomness, (will change everytime you run this file)
            // commonly referred to as “toxic waste”.
            const keypair = zokratesProvider.setup(artifacts.program);
            state['pk'] = toHexString(keypair.pk);

            // Save the State Data into a file so that we can use the Verifier in our tests.
            fs.writeFile(process.cwd() +'/circuits/state.json', JSON.stringify(state), function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("State Exported");
                }
            })

            // Export the Solidity Verifier.
            const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk, "v1");
            fs.writeFile(process.cwd() +'/contracts/ZkVerfier.sol', verifier, function(err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Verifier Exported");
                }
            })
        }
        else {
            console.error(err);
        }
    });
});
