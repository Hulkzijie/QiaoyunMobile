import { ethers } from 'ethers';
import { walletUtils } from './wallet';

// ERC20代币ABI
const ERC20_ABI = [
  // 只包含我们需要的函数
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

export class TokenContract {
  private contract: ethers.Contract | null = null;
  
  // 初始化合约
  initContract(tokenAddress: string) {
    try {
      this.contract = walletUtils.getContract(tokenAddress, ERC20_ABI);
      return true;
    } catch (error) {
      console.error('初始化合约失败:', error);
      return false;
    }
  }
  
  // 获取代币符号
  async getSymbol() {
    if (!this.contract) {
      throw new Error('合约未初始化');
    }
    
    try {
      return await this.contract.symbol();
    } catch (error) {
      console.error('获取代币符号失败:', error);
      throw error;
    }
  }
  
  // 获取代币精度
  async getDecimals() {
    if (!this.contract) {
      throw new Error('合约未初始化');
    }
    
    try {
      return await this.contract.decimals();
    } catch (error) {
      console.error('获取代币精度失败:', error);
      throw error;
    }
  }
  
  // 获取代币余额
  async getBalance(address: string) {
    if (!this.contract) {
      throw new Error('合约未初始化');
    }
    
    try {
      const decimals = await this.getDecimals();
      const balance = await this.contract.balanceOf(address);
      return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
      console.error('获取代币余额失败:', error);
      throw error;
    }
  }
  
  // 转账代币
  async transfer(to: string, amount: string) {
    if (!this.contract) {
      throw new Error('合约未初始化');
    }
    
    try {
      const decimals = await this.getDecimals();
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);
      const tx = await this.contract.transfer(to, parsedAmount);
      return tx;
    } catch (error) {
      console.error('转账代币失败:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const tokenContract = new TokenContract();