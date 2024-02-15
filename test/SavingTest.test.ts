import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect, assert} from "chai";
import { ethers} from "hardhat";
import { Contract } from "ethers";

describe("SavingEthers", function(){

    let saving: Contract;
    let owner;
    let otherSigners;
    let addressZer0 = "0x0000000000000000000000000000000000000000";

    this.beforeEach(async function(){
        [owner, otherSigners] = await ethers.getSigners();
        const Saving = await ethers.getContractFactory("SavingEthers");
        saving = await Saving.deploy();
    }),
   

    describe("test deploy", function(){
        it("test that when it is been deployed it is not null", async function(){
            assert.isNotNull(saving);
        })
    }),

    describe("test deposit", function(){
        it("when i deposit i can get the balance", async function(){
            await saving.deposit({value: ethers.parseEther("1")});
            const result = await saving.checkSavings(owner.address);
            expect(result).to.be.equal(ethers.parseEther("1.0"));
        }),
        it ("test that zero address cannot deposit", async function(){
            await saving.deposit({value: ethers.parseEther("1.0")});
            expect(owner.address).is.not.equal(addressZer0);
        }), 
        it("test that amount is greater than zero", async function(){
            try{
                await saving.deposit({value: 0});
            }catch(error){
               expect(error.message).to.include("can't save zero value");
            }
        })
    }),

    describe("test withdraw", function(){
        it("when i withdraw, i should check my balance to see the change...", async function(){
            await saving.deposit({value: ethers.parseEther("2.0")});

            await saving.withdraw();
            const result = await saving.checkSavings(owner.address);
            expect(result).to.be.equal(0);
        }), 
        it("user cannot withdraw from the an empty saving", async function(){
            try{
                await saving.withdraw();
            }catch(error){
                expect(error.message).to.include("you don't have any savings");
            }
        })
    })


})