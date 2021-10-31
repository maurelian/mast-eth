/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ActionState, ActionStateInterface } from "../ActionState";

const _abi = [
  {
    inputs: [],
    name: "lastAction",
    outputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numActions",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAction",
    outputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610429806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063506623c7146100465780638514668f1461006757806389f71d5314610085575b600080fd5b61004e6100a6565b60405161005e949392919061028f565b60405180910390f35b61006f61016c565b60405161007c91906102db565b60405180910390f35b61008d610172565b60405161009d949392919061028f565b60405180910390f35b60048060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020180546100e390610381565b80601f016020809104026020016040519081016040528092919081815260200182805461010f90610381565b801561015c5780601f106101315761010080835404028352916020019161015c565b820191906000526020600020905b81548152906001019060200180831161013f57829003601f168201915b5050505050908060030154905084565b60085481565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020180546101af90610381565b80601f01602080910402602001604051908101604052809291908181526020018280546101db90610381565b80156102285780601f106101fd57610100808354040283529160200191610228565b820191906000526020600020905b81548152906001019060200180831161020b57829003601f168201915b5050505050908060030154905084565b61024181610312565b82525050565b6000610252826102f6565b61025c8185610301565b935061026c81856020860161034e565b610275816103e2565b840191505092915050565b61028981610344565b82525050565b60006080820190506102a46000830187610238565b6102b16020830186610280565b81810360408301526102c38185610247565b90506102d26060830184610280565b95945050505050565b60006020820190506102f06000830184610280565b92915050565b600081519050919050565b600082825260208201905092915050565b600061031d82610324565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101561036c578082015181840152602081019050610351565b8381111561037b576000848401525b50505050565b6000600282049050600182168061039957607f821691505b602082108114156103ad576103ac6103b3565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000601f19601f830116905091905056fea264697066735822122045a04f95032eb2cc629c72f08abbc904eebdfe0993d5a20b82a835c520d8e89364736f6c63430008040033";

type ActionStateConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ActionStateConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ActionState__factory extends ContractFactory {
  constructor(...args: ActionStateConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ActionState> {
    return super.deploy(overrides || {}) as Promise<ActionState>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ActionState {
    return super.attach(address) as ActionState;
  }
  connect(signer: Signer): ActionState__factory {
    return super.connect(signer) as ActionState__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ActionStateInterface {
    return new utils.Interface(_abi) as ActionStateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ActionState {
    return new Contract(address, _abi, signerOrProvider) as ActionState;
  }
}