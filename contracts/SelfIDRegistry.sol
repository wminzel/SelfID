// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SelfIDRegistry {

    struct PublicKey {
        bytes key;
        uint256 updatedAt;
    }

    mapping(bytes32 => PublicKey) public didToKey;

    event DIDRegistered(string indexed did, bytes publicKey);
    event KeyUpdated(string indexed did, bytes newPublicKey);

    function hashDID(string memory did) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(did));
    }

    function registerDID(string calldata did, bytes calldata publicKey) external {
        bytes32 didHash = hashDID(did);
        require(didToKey[didHash].key.length == 0, "DID already registered");

        didToKey[didHash] = PublicKey({
            key: publicKey,
            updatedAt: block.timestamp
        });

        emit DIDRegistered(did, publicKey);
    }

    function updateKey(string calldata did, bytes calldata newPublicKey) external {
        bytes32 didHash = hashDID(did);
        require(didToKey[didHash].key.length != 0, "DID not registered");

        // TODO: verify ownership via signature
        didToKey[didHash] = PublicKey({
            key: newPublicKey,
            updatedAt: block.timestamp
        });

        emit KeyUpdated(did, newPublicKey);
    }

    function resolve(string calldata did)
        external
        view
        returns (bytes memory publicKey, uint256 updatedAt)
    {
        bytes32 didHash = hashDID(did);
        PublicKey memory pk = didToKey[didHash];
        return (pk.key, pk.updatedAt);
    }
}
