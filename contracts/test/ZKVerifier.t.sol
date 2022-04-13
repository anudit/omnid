// SPDX-License-Identifier: AGPL-3.0
pragma solidity 0.8.13;

import '../ZkVerifier.sol';
import "ds-test/test.sol";

contract ZkVerifierTest is DSTest {

    Verifier internal zkVerifier;

    function setUp() public {
        zkVerifier = new Verifier();
    }

    function testValidProofVerify() public {

        Pairing.G1Point memory a = Pairing.G1Point(
            uint256(0x2350f8a0e2632b6a6263f25399cccd7acac5071374deb3dfddc7a8f6403cda72),
            uint256(0x2dcf696d400516b327bb793d7163353dbfa15f43ac55beb18dde9b76cc0b8629)
        );
        Pairing.G2Point memory b = Pairing.G2Point(
            [
                uint256(0x1e0741e5371dfb9b5d64a3648f6a00bd3ddd1f49773dd7e39d8e80f9528fb9c5),
                uint256(0x065cda7a43fc0f9c9020222850a5ad926cedc7d6bddf239d034454bed5c4bd78)
            ],
            [
                uint256(0x1cd443e08a0b98bd0ee6dabcb52d928993bc7565035e2fe14a0720415d284d6f),
                uint256(0x03f5ca544c64be5a2215baba2a7d6e8b3554dd4a4087cd09fa9ee50557de3ee4)
            ]
        );
        Pairing.G1Point memory c = Pairing.G1Point(
            uint256(0x03e301fc3938c14a158ab393095fdcd86f6e0dd49838ce322940228f3fdd3c80),
            uint256(0x28143f38cfd83b3151739f2ce1ed2aeeb3f23230b56a8c46d2354a853e4b2e05)
        );

        Verifier.Proof memory proof = Verifier.Proof(a, b, c);
        bool resp = zkVerifier.verifyTx(proof,
            [
                uint256(0x000000000000000000000000000000000000000000000000000000000000003c),
                uint256(0x0000000000000000000000000000000000000000000000000000000000000046),
                uint256(0x0000000000000000000000000000000000000000000000000000000000000001)
            ]
        );
        assertTrue(resp);
    }

    function testInvalidProofVerify() public {

        Pairing.G1Point memory a = Pairing.G1Point(
            uint256(0x2350f8a0e2632b6a6263f25399cccd7acac5071374deb3dfddc7a8f6403cda72),
            uint256(0x2dcf696d400516b327bb793d7163353dbfa15f43ac55beb18dde9b76cc0b8629)
        );
        Pairing.G2Point memory b = Pairing.G2Point(
            [
                uint256(0x1e0741e5371dfb9b5d64a3648f6a00bd3ddd1f49773dd7e39d8e80f9528fb9c5),
                uint256(0x065cda7a43fc0f9c9020222850a5ad926cedc7d6bddf239d034454bed5c4bd78)
            ],
            [
                uint256(0x1cd443e08a0b98bd0ee6dabcb52d928993bc7565035e2fe14a0720415d284d6f),
                uint256(0x03f5ca544c64be5a2215baba2a7d6e8b3554dd4a4087cd09fa9ee50557de3ee4)
            ]
        );
        Pairing.G1Point memory c = Pairing.G1Point(
            uint256(0x03e301fc3938c14a158ab393095fdcd86f6e0dd49838ce322940228f3fdd3c80),
            uint256(0x28143f38cfd83b3151739f2ce1ed2aeeb3f23230b56a8c46d2354a853e4b2e05)
        );

        Verifier.Proof memory proof = Verifier.Proof(a, b, c);
        bool resp = zkVerifier.verifyTx(proof,
            [
                uint256(0x0000000000000000000000000000000000000000000000000000000000000000),
                uint256(0x0000000000000000000000000000000000000000000000000000000000000046),
                uint256(0x0000000000000000000000000000000000000000000000000000000000000001)
            ]
        );
        assertTrue(!resp);
    }
}
