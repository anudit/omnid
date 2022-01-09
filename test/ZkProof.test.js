const { expect } = require("chai");
const fs = require('fs');
const { initialize } = require('zokrates-js/node');

const fromHexString = hexString =>
  new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

describe("ZkProof", async () => {

    let verifier;
    let owner, addr1, addr2, addrs;

    const zkstate = JSON.parse(await fs.readFileSync(process.cwd() + '/circuits/state.json', {encoding: 'utf8'}));
    const zokratesProvider = await initialize();
    const program = fromHexString(zkstate.program);
    const keypair = fromHexString(zkstate.pk);

    function generateProof(score, rangeLow, rangeHigh){
        const { witness, output } = zokratesProvider.computeWitness({
            abi: JSON.stringify(zkstate.abi),
            program,
        }, [score, rangeLow, rangeHigh]);
        console.log('output', output);
        return zokratesProvider.generateProof(
            program,
            witness,
            keypair
        );
    }

    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        const VerifierFactory = await ethers.getContractFactory("Verifier");
        verifier = await VerifierFactory.deploy();

    });

    describe("ZK Verification Tests", (accounts) => {

        it("Should deploy contracts", async function () {
            expect(true).to.equal(true);
        });

        it("Should gen proof1", async function () {
            let { proof, inputs } = generateProof('12', '10', '20');
            let res = await verifier.verifyTx([proof.a, proof.b, proof.c],inputs);
            expect(res).to.equal(true);
        });

        it("Should gen proof2", async function () {
            let { proof, inputs } = generateProof('12', '100', '200');
            let res = await verifier.verifyTx([proof.a, proof.b, proof.c],inputs);
            expect(res).to.equal(true);
        });

        it("Should gen proof3", async function () {
            let { proof, inputs } = generateProof('16', '100', '200');
            let res = await verifier.verifyTx([proof.a, proof.b, proof.c],inputs);
            expect(res).to.equal(true);
        });

    });

});
