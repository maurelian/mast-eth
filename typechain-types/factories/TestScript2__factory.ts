/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestScript2, TestScript2Interface } from "../TestScript2";

const _abi = [
  {
    inputs: [],
    name: "run",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610194806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063c040622614610030575b600080fd5b61003861004e565b6040516100459190610120565b60405180910390f35b60008073ffffffffffffffffffffffffffffffffffffffff16635b631f406040518163ffffffff1660e01b815260040160206040518083038186803b15801561009657600080fd5b505afa1580156100aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100ce91906100e8565b905090565b6000815190506100e281610147565b92915050565b6000602082840312156100fa57600080fd5b6000610108848285016100d3565b91505092915050565b61011a8161013b565b82525050565b60006020820190506101356000830184610111565b92915050565b60008115159050919050565b6101508161013b565b811461015b57600080fd5b5056fea26469706673582212200f8f2423917a308e610f5022b22ea720ce2c3227c0aceeb0bc5f3217fe6b390f64736f6c63430008040033";

type TestScript2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestScript2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestScript2__factory extends ContractFactory {
  constructor(...args: TestScript2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestScript2> {
    return super.deploy(overrides || {}) as Promise<TestScript2>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestScript2 {
    return super.attach(address) as TestScript2;
  }
  connect(signer: Signer): TestScript2__factory {
    return super.connect(signer) as TestScript2__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestScript2Interface {
    return new utils.Interface(_abi) as TestScript2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestScript2 {
    return new Contract(address, _abi, signerOrProvider) as TestScript2;
  }
}