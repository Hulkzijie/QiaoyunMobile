import { ethers } from 'ethers';

// 创建一个钱包工具类
export class WalletUtils {
  // 提供者实例
  private provider: ethers.providers.Provider | null = null;
  // 钱包实例
  private wallet: ethers.Wallet | null = null;
  
  // 初始化提供者
  initProvider(rpcUrl: string = 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY') {
    try {
      this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      return true;
    } catch (error) {
      console.error('初始化提供者失败:', error);
      return false;
    }
  }
  
  // 创建随机钱包
  createRandomWallet() {
    try {
      this.wallet = ethers.Wallet.createRandom();
      if (this.provider) {
        this.wallet = this.wallet.connect(this.provider);
      }
      return this.wallet;
    } catch (error) {
      console.error('创建钱包失败:', error);
      return null;
    }
  }
  
  // 通过私钥导入钱包
  importWalletByPrivateKey(privateKey: string) {
    try {
      this.wallet = new ethers.Wallet(privateKey);
      if (this.provider) {
        this.wallet = this.wallet.connect(this.provider);
      }
      return this.wallet;
    } catch (error) {
      console.error('导入钱包失败:', error);
      return null;
    }
  }
  
  // 获取钱包地址
  getAddress() {
    return this.wallet?.address || '';
  }
  
  // 获取钱包余额
  async getBalance() {
    if (!this.wallet || !this.provider) {
      return '0';
    }
    
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.utils.formatEther(balance); // 转换为ETH单位
    } catch (error) {
      console.error('获取余额失败:', error);
      return '0';
    }
  }
  
  // 发送交易
  async sendTransaction(to: string, amount: string) {
    if (!this.wallet) {
      throw new Error('钱包未初始化');
    }
    
    try {
      const tx = await this.wallet.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount)
      });
      
      return tx;
    } catch (error) {
      console.error('发送交易失败:', error);
      throw error;
    }
  }
  
  // 与智能合约交互
  getContract(contractAddress: string, abi: any) {
    if (!this.provider) {
      throw new Error('提供者未初始化');
    }
    
    try {
      // 只读合约
      const readOnlyContract = new ethers.Contract(contractAddress, abi, this.provider);
      
      // 可写合约(如果有钱包)
      if (this.wallet) {
        return readOnlyContract.connect(this.wallet);
      }
      
      return readOnlyContract;
    } catch (error) {
      console.error('获取合约失败:', error);
      throw error;
    }
  }
}

// 导出单例实例
export const walletUtils = new WalletUtils();