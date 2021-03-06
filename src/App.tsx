import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Naviagation from './components/navigation/Navigation';
import { AuthenticationProvider } from './components/providers/Authentication';
import CreatePost from './pages/CreatePost';
import List, { ListType } from './pages/List';

require('@solana/wallet-adapter-react-ui/styles.css');

const App = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network })
        ],
        [network]
    );

    return (
        <Router>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect={false}>
                    <WalletModalProvider>
                        <AuthenticationProvider>
                            <Naviagation />
                            <Routes>
                                <Route path="/post" element={<CreatePost />} />
                                <Route path="/queue" element={<List listType={ListType.Queue} key="queue" />} />
                                <Route path="/doubly-linked-list" element={<List listType={ListType.DoublyLinkedList} key="doubly-linked-list" />} />
                            </Routes>
                        </AuthenticationProvider>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </Router>
    );
};

export default App;
