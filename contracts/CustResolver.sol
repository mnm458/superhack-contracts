// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import {IEAS, Attestation} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {SchemaResolver} from "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";
import {ByteHasher} from "./ByteHasher.sol";
import {ISchemaRegistry} from "@ethereum-attestation-service/eas-contracts/contracts/ISchemaRegistry.sol";
import {IWorldID} from "../interfaces/IWorldID.sol";

contract CustResolver is SchemaResolver {
    using ByteHasher for bytes;
    string public constant registrationSchema =
        "bytes32 projectUid,string textField";

    bytes32 public immutable registrationSchemaUID;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    event Log(uint256 value);

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;

    constructor(
        IEAS eas,
        ISchemaRegistry _schemaRegistry,
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) SchemaResolver(eas) {
        registrationSchemaUID = _schemaRegistry.register(
            registrationSchema,
            this,
            true
        );
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 value
    ) internal override returns (bool) {
        // We now verify the provided proof is valid and the user is verified by World ID

        // We now record the user has done this, so they can't do it again (proof of uniqueness)

        emit Log(1);
        (
            bytes32 _projectUid,
            string memory _textField,
            address _signal,
            uint256 _root,
            uint256 _nullifierHash,
            uint256[8] memory _proof
        ) = abi.decode(
                attestation.data,
                (bytes32, string, address, uint256, uint256, uint256[8])
            );
        if (nullifierHashes[_nullifierHash]) revert InvalidNullifier();
        worldId.verifyProof(
            _root,
            groupId,
            abi.encodePacked(_signal).hashToField(),
            _nullifierHash,
            externalNullifier,
            _proof
        );
        nullifierHashes[_nullifierHash] = true;
        return true;
    }

    function onRevoke(
        Attestation calldata attestation,
        uint256 value
    ) internal pure override returns (bool) {
        return true;
    }
}
