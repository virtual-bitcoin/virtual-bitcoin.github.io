import { createConnectButton } from './components/wallet';
import './main.less';

console.log(location.pathname.startsWith('/mining'), location.pathname);
if (location.pathname.startsWith('/mining')) {
  const container = document.getElementById('mining-interface');
  if (container) {
    container.appendChild(createConnectButton());
  }
}
