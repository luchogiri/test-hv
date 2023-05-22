//
import Houses from './Houses';
import Header from '../components/Header';

export default function App() {
  return (
    <>
      <Header>
        Houses&nbsp;
        <small>(by HomeVision)</small>
      </Header>
      
      <Houses />
    </>
  );
}
