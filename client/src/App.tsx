import { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Input, List, message } from 'antd';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';
import { AptosClient, Types } from 'aptos';

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

interface NFT {
  name: string;
  collection: string;
}

export default function App() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [newNftName, setNewNftName] = useState('');

  useEffect(() => {
    if (account) {
      fetchNFTs();
    }
  }, [account]);

  const fetchNFTs = async () => {
    if (!account) return;
    try {
      const accountResources = await client.getAccountResources(account.address);
      const tokenStore = accountResources.find((r) => r.type.includes('::token::TokenStore'));
      if (tokenStore && 'data' in tokenStore) {
        const tokens = (tokenStore.data as { tokens?: NFT[] }).tokens || [];
        setNfts(tokens);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  const mintNFT = async () => {
    if (!account) return;
    try {
      const payload: Types.TransactionPayload = {
        type: 'entry_function',
        function: `${account.address}::test_utils::mint_tokenv2`,
        type_arguments: [],
        arguments: [newNftName],
      };

      const transaction = {
        sender: account.address,
        data: payload,
        options: {}, // include any additional options here if needed
      };

      const transactionRes = await signAndSubmitTransaction(transaction);

      await client.waitForTransaction(transactionRes.hash);
      message.success('NFT minted successfully!');
      setNewNftName('');
      fetchNFTs();
    } catch (error) {
      console.error('Error minting NFT:', error);
      message.error('Failed to mint NFT');
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="space-between" style={{ padding: '20px' }}>
        <Col>
          <h1>NFT MARKET</h1>
        </Col>
        <Col>
          <WalletSelector />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ padding: '20px'    }}    ><Col span={12}>
          <h2>Mint New NFT</h2>
          <Input
            placeholder="Enter NFT name"
            value={newNftName}
            onChange={(e) => setNewNftName(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <Button onClick={mintNFT} disabled={!account || !newNftName}>
            Mint NFT
          </Button>
        </Col>
        <Col span={12}>
         <h2>Your NFTs</h2>
          <List
            dataSource={nfts}
            renderItem={(nft: NFT) => (
              <List.Item>
                <List.Item.Meta title={nft.name} description={`Collection: ${nft.collection}`} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
  );
}